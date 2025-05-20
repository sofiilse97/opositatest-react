import { useLibrary } from '@/context/hooks/useLibrary';
import './searchBar.css';
import Button from '@/components/ui/button/Button';
import { useQueryClient } from '@tanstack/react-query';
import { SEARCH_BOOK_QUERY_KEY } from '@/api/queries/search/useSearchBookQueries';
import { useCallback } from 'react';

/**
 *  Componente de barra de búsqueda para filtrar libros.
 * @returns {JSX.Element} Componente SearchBar
 */
const SearchBar = () => {
  const queryClient = useQueryClient();
  const { libraryState, setLibraryState } = useLibrary();

  const handleClick = useCallback(() => {
    setLibraryState({ page: 1, size: 10, searchQuery: '' });
    void queryClient.removeQueries({
      queryKey: [SEARCH_BOOK_QUERY_KEY],
    });
  }, [setLibraryState, queryClient]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLibraryState({ searchQuery: e.target.value });
    },
    [setLibraryState]
  );

  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar libro"
        value={libraryState.searchQuery || ''}
        onChange={handleChange}
      />
      <Button onClick={handleClick} className="updateBtn">
        Actualizar libros
      </Button>
    </div>
  );
};

export default SearchBar;
