import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BooksList from '../booksList/books-list';

describe('BooksList', () => {
  it('renderiza correctamente', async () => {
    render(<BooksList />);

    expect(screen.getByPlaceholderText(/Buscar libro/i)).toBeInTheDocument();
    expect(screen.getByText(/Actualizar libros/i)).toBeInTheDocument();
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();

    // Wait for the books to be loaded
    await waitFor(() => expect(screen.getByText(/Libros encontrados/i)).toBeInTheDocument());
  });

  it('filtra los libros por el término de búsqueda', async () => {
    render(<BooksList />);

    await waitFor(() => {
      expect(screen.queryByText('A Dance with Dragons')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText(/Buscar libro/i);
    fireEvent.change(input, { target: { value: 'A Game' } });

    expect(screen.queryByText('A Dance with Dragons')).toBeNull();
    expect(screen.queryByText('A Game of Thrones')).toBeInTheDocument();
  });

  it('marca fav', async () => {
    render(<BooksList />);

    await waitFor(() => screen.getByText('A Game of Thrones'));

    const favoriteButton = screen.getAllByText('☆')[0]; // Botón de favorito (sin marcar)
    fireEvent.click(favoriteButton);

    expect(favoriteButton).toHaveTextContent('★'); // Marcado como favorito
  });

  it('detalles', async () => {
    render(<BooksList />);

    await waitFor(() => screen.getByText('A Game of Thrones'));

    const bookButton = screen.getByText('A Game of Thrones');
    fireEvent.click(bookButton);

    expect(screen.getByText(/George R. R. Martin/i)).toBeInTheDocument();
  });

  it('cierra el modal', async () => {
    render(<BooksList />);

    await waitFor(() => screen.getByText('A Game of Thrones'));

    const bookButton = screen.getByText('A Game of Thrones');
    fireEvent.click(bookButton);

    await waitFor(() => screen.getByText(/Cerrar/i));

    const closeButton = screen.getByText(/Cerrar/i);
    fireEvent.click(closeButton);

    await waitFor(() => expect(screen.queryByText(/Autor:/i)).not.toBeInTheDocument());
  });
});
