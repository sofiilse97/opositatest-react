import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LibraryProvider from '@/context/LibraryProvider';

/**
 * Renderiza un componente de React con los proveedores necesarios para pruebas.
 *
 * Para ello envuelve el componente de UI con `QueryClientProvider`
 * y `LibraryProvider` ya que los componentes necesarios necesitan acceso al contexto y react-query.
 *
 * @param ui - El componente de React a renderizar
 * @returns El resultado de la función `render` de la librería `@testing-library/react` con los proveedores aplicados.
 *
 */
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

export { renderWithProvider };
