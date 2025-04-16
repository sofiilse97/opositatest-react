import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BooksList from '../booksList/BooksList';
import LibraryProvider from '@/context/LibraryProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('BooksList', () => {
  const renderWithProvider = (ui: React.ReactNode) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    return render(
      <QueryClientProvider client={queryClient}>
        <LibraryProvider>{ui}</LibraryProvider>
      </QueryClientProvider>
    );
  };

  it('renderiza correctamente', async () => {
    renderWithProvider(<BooksList />);
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
    await waitFor(
      () =>
        expect(
          screen.getByPlaceholderText(/Buscar libro/i)
        ).toBeInTheDocument(),
      { timeout: 5000 }
    );

    expect(screen.getByText(/Actualizar libros/i)).toBeInTheDocument();

    const updateButton = screen.getByText(/Actualizar libros/i);
    expect(updateButton).toBeInTheDocument();
    fireEvent.click(updateButton);

    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();

    // Wait for the books to be loaded
    await waitFor(
      () => expect(screen.getByText(/resultados/i)).toBeInTheDocument(),
      { timeout: 5000 }
    );
  });

  it('filtra los libros por el término de búsqueda', async () => {
    renderWithProvider(<BooksList />);

    await waitFor(() => {
      expect(screen.queryByText('A Dance with Dragons')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText(/Buscar libro/i);
    fireEvent.change(input, { target: { value: 'A Game' } });

    expect(screen.queryByText('A Dance with Dragons')).toBeNull();
    expect(screen.queryByText('A Game of Thrones')).toBeInTheDocument();
  });

  it('marca fav', async () => {
    renderWithProvider(<BooksList />);

    await waitFor(() => screen.getByText('A Game of Thrones'));

    const favoriteButton = screen.getAllByText('☆')[0]; // Botón de favorito (sin marcar)
    fireEvent.click(favoriteButton);

    expect(favoriteButton).toHaveTextContent('★'); // Marcado como favorito
  });

  it('detalles', async () => {
    renderWithProvider(<BooksList />);

    await waitFor(() => screen.getByText('A Game of Thrones'));
    const bookButton = screen.getByText('A Game of Thrones');
    fireEvent.click(bookButton);

    const bookInfo = document.getElementsByClassName(
      'book-modal-body'
    )[0] as HTMLElement;
    expect(
      within(bookInfo).getByText(/George R. R. Martin/i)
    ).toBeInTheDocument();
  });

  it('cierra el modal', async () => {
    renderWithProvider(<BooksList />);

    await waitFor(() => screen.getByText('A Game of Thrones'));

    const bookButton = screen.getByText('A Game of Thrones');
    fireEvent.click(bookButton);

    const closeButton = screen.getByTestId('book-modal-close-btn');
    fireEvent.click(closeButton);

    await waitFor(() =>
      expect(screen.queryByText(/Autor:/i)).not.toBeInTheDocument()
    );
  });
});
