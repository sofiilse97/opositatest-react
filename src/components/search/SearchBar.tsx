import './searchBar.css';

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  initBooks,
}: {
  searchQuery: string;
  setSearchQuery: (value: React.SetStateAction<string>) => void;
  initBooks: () => Promise<void>;
}) => {
  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar libro"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={initBooks} className="updateBtn">
        Actualizar libros
      </button>
    </div>
  );
};

export default SearchBar;
