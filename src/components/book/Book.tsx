const Book = ({
  key,
  handleBook,
  handleFavorite,
  book,
  favorites,
}: {
  key: string | number
  handleBook: (bk: any) => void
  handleFavorite: (b: any) => void
  book: any
  favorites: Set<string>
}) => {
  return (
    <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
      <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} />
      <button
        onClick={() => handleBook(book)}
        style={{ cursor: 'pointer', marginRight: '10px' }}
      >
        {book.name}
      </button>
      <button
        onClick={() => handleFavorite(book)}
        style={{
          backgroundColor: favorites.has(book.url) ? 'gold' : '#ddd',
          padding: '5px',
          cursor: 'pointer',
        }}
      >
        {favorites.has(book.url) ? '★' : '☆'}
      </button>
    </div>
  )
}

export default Book
