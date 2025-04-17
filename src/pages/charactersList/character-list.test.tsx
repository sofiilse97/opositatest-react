import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWithProvider } from '@/test_utils/test-utils';
import CharacterList from './CharacterList';

describe('CharacterList', () => {
  it('Renderiza correctamente', async () => {
    renderWithProvider(<CharacterList />);
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();

    await waitFor(
      () =>
        expect(
          screen.getByPlaceholderText(/Buscar personaje/i)
        ).toBeInTheDocument(),
      { timeout: 5000 }
    );

    expect(
      screen.getByText(/^\d+ personajes en esta página$/i)
    ).toBeInTheDocument();
  });

  it('Busca los personajes por el término de búsqueda', async () => {
    renderWithProvider(<CharacterList />);

    await waitFor(() => {
      expect(screen.queryByText('Mostrar filtros')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText(/Buscar personaje por nombre/i);
    fireEvent.change(input, { target: { value: 'Melicent' } });

    await waitFor(() => {
      expect(screen.queryByText(/Melicent/i)).toBeInTheDocument();
    });

    expect(screen.queryByText('Septa')).toBeInTheDocument();
  });

  it('Filtros renderizan correctamente', async () => {
    renderWithProvider(<CharacterList />);

    await waitFor(() => {
      expect(screen.queryByText('Mostrar filtros')).toBeInTheDocument();
    });

    const filterBtn = screen.getAllByText('Mostrar filtros')[0];
    fireEvent.click(filterBtn);

    expect(screen.getByText('Ocultar filtros')).toBeInTheDocument();
    /** Esto podría ser un test del propio componente SearchForm */
    expect(screen.getByText('Filtrar búsqueda')).toBeInTheDocument();
    expect(screen.getByText('Género')).toBeInTheDocument();
    expect(screen.getByText('Año de nacimiento')).toBeInTheDocument();
    expect(screen.getByText('Año de muerte')).toBeInTheDocument();
    /** ------- */

    const filterBtn2 = screen.getAllByText('Ocultar filtros')[0];
    fireEvent.click(filterBtn2);
    expect(screen.getByText('Mostrar filtros')).toBeInTheDocument();
  });

  it('Filtrar busqueda con resultados', async () => {
    renderWithProvider(<CharacterList />);

    await waitFor(() => {
      expect(screen.queryByText('Mostrar filtros')).toBeInTheDocument();
    });

    const filterBtn = screen.getAllByText('Mostrar filtros')[0];
    fireEvent.click(filterBtn);

    const inputGender = screen.getByTestId('gender-input');
    fireEvent.change(inputGender, { target: { value: 'male' } });

    const diedInput = screen.getByTestId('died-input');
    fireEvent.change(diedInput, { target: { value: '299' } });

    const filterBtn2 = screen.getAllByText('Aplicar filtros')[0];
    fireEvent.click(filterBtn2);

    await waitFor(() => {
      expect(
        screen.queryByText('3 personajes en esta página')
      ).toBeInTheDocument();
    });

    expect(screen.getByText('Alfyn')).toBeInTheDocument();
  });

  it('Filtrar busqueda sin resultados', async () => {
    renderWithProvider(<CharacterList />);

    await waitFor(() => {
      expect(screen.queryByText('Mostrar filtros')).toBeInTheDocument();
    });

    const filterBtn = screen.getAllByText('Mostrar filtros')[0];
    fireEvent.click(filterBtn);

    const diedInput = screen.getByTestId('born-input');
    fireEvent.change(diedInput, { target: { value: '1' } });

    const filterBtn2 = screen.getAllByText('Aplicar filtros')[0];
    fireEvent.click(filterBtn2);

    await waitFor(() => {
      expect(
        screen.queryByText('No se encontraron personajes con esa búsqueda')
      ).toBeInTheDocument();
    });
  });
});
