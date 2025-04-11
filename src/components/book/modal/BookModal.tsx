import { getCoverFile } from '../../../api/constants/books'
import { BookType } from '../../../types/book'

const BookModal = ({
  selectedBook,
  handleFavorite,
  favorites,
  setSelectedBook,
}: {
  selectedBook: BookType | null
  handleFavorite: (b: BookType) => void
  favorites: Set<string>
  setSelectedBook: (value: BookType | null) => void
}) => {
  if (selectedBook == null) return <></>

  return (
    <div
      style={{
        position: 'fixed',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -20%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
      }}
    >
      <img src={getCoverFile({ isbn: selectedBook.isbn })} />
      <h2>{selectedBook.name}</h2>
      <p>
        <strong>Autor:</strong> {selectedBook.authors.join(', ')}
      </p>
      <p>
        <strong>Editorial:</strong> {selectedBook.publisher}
      </p>
      <p>
        <strong>Páginas:</strong> {selectedBook.numberOfPages}
      </p>
      <p>
        <strong>Año:</strong> {selectedBook.released}
      </p>
      <button
        onClick={() => handleFavorite(selectedBook)}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px',
          cursor: 'pointer',
          marginBottom: '10px',
        }}
      >
        {favorites.has(selectedBook.url)
          ? 'Quitar de favoritos'
          : 'Agregar a favoritos'}
      </button>
      <button
        onClick={() => setSelectedBook(null)}
        style={{
          backgroundColor: '#ccc',
          padding: '10px',
          cursor: 'pointer',
          display: 'block',
          marginBottom: '10px',
        }}
      >
        Cerrar
      </button>
      <button
        onClick={() => window.open(selectedBook.url, '_blank')}
        style={{
          backgroundColor: '#02874a',
          color: 'white',
          padding: '10px',
          cursor: 'pointer',
        }}
      >
        Abrir API en el navegador
      </button>
    </div>
  )
}

export default BookModal
