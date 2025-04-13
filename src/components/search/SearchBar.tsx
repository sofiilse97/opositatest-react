import { useLibrary } from '../../context/hooks/useLibrary';
import Button from '../ui/button/Button';
import './searchBar.css';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, initBooks } = useLibrary();

  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar libro"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button onClick={initBooks} className="updateBtn">
        Actualizar libros
      </Button>
    </div>
  );
};

export default SearchBar;
