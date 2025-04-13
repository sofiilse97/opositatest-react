import { getCoverFile } from '../../../api/constants/books';
import { BookType } from '../../../types/book';
import { parseYear } from '../../../utils/dates/dateUtil';
import './bookModal.css';
const BookModal = ({
  selectedBook,
  handleFavorite,
  favorites,
  setSelectedBook,
}: {
  selectedBook: BookType | null;
  handleFavorite: (b: BookType) => void;
  favorites: Set<string>;
  setSelectedBook: (value: BookType | null) => void;
}) => {
  if (selectedBook == null) return <></>;

  return (
    <div className="book-modal">
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
        <strong>Año:</strong> {parseYear(selectedBook.released)}
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
  );
};

export default BookModal;
