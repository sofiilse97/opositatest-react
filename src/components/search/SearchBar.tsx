import { useLibrary } from '@/context/hooks/useLibrary';
import './searchBar.css';
import Button from '@/components/ui/button/Button';
import { useQueryClient } from '@tanstack/react-query';
import { SEARCH_BOOK_QUERY_KEY } from '@/api/queries/search/useSearchBookQueries';

const SearchBar = () => {
  const queryClient = useQueryClient();
  const { libraryState, setLibraryState } = useLibrary();

  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar libro"
        value={libraryState.searchQuery || ''}
        onChange={(e) => setLibraryState({ searchQuery: e.target.value })}
      />
      <Button
        onClick={() => {
          setLibraryState({ page: 1, size: 10, searchQuery: '' });
          void queryClient.removeQueries({
            queryKey: [SEARCH_BOOK_QUERY_KEY],
          });
        }}
        className="updateBtn"
      >
        Actualizar libros
      </Button>
    </div>
  );
};

export default SearchBar;
