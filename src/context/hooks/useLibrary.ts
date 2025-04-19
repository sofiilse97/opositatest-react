import { useContext } from 'react';
import { LibraryContext } from '../LibraryContext';

/**
 * Hook personalizado para acceder al contexto de la biblioteca, proporciona acceso al estado de la biblioteca
 * y a la función para actualizarlo.
 *
 * @returns {LibraryContextType} El contexto de la biblioteca.
 * @throws {Error} Si se usa fuera del proveedor de contexto.
 */
export const useLibrary = () => {
  const libraryContext = useContext(LibraryContext);

  if (!libraryContext) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }

  return libraryContext;
};
