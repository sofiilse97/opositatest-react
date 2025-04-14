import { useLibrary } from '../../context/hooks/useLibrary';
import Button from '../ui/button/Button';
import './searchBar.css';

const SearchBar = () => {
  const { libraryState, setLibraryState } = useLibrary();

  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar libro"
        value={libraryState.searchQuery || ''}
        onChange={(e) => setLibraryState({ searchQuery: e.target.value })}
      />
      <Button onClick={() => {}} className="updateBtn">
        Actualizar libros
      </Button>
    </div>
  );
};

export default SearchBar;
