const SearchBar = ({
  searchQuery,
  setSearchQuery,
  initBooks,
}: {
  searchQuery: string
  setSearchQuery: (value: React.SetStateAction<string>) => void
  initBooks: () => Promise<void>
}) => {
  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar libro"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: '10px',
          marginBottom: '10px',
          border: '1px solid #ddd',
        }}
      />
      <button
        onClick={initBooks}
        style={{
          padding: '10px',
          marginBottom: '20px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
        }}
      >
        Actualizar libros
      </button>
    </div>
  )
}

export default SearchBar
