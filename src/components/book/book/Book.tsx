import { getCoverFile } from '../../../api/constants/books';
import { BookType } from '../../../types/book';
import defaultBook from '../../../resources/defaultBook.png';
import './book.css';
import { useBooks } from '../../../hooks/useBooks';

const Book = ({
  key,
  book,
}: {
  key: string | number;

  book: BookType;
}) => {
  const { handleBook, handleFavorite, favorites } = useBooks();

  return (
    <div key={key} className="book" onClick={() => handleBook(book)}>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            right: '5px',
            top: '5px',
            pointerEvents: 'auto',
          }}
        >
          <button
            onClick={(event: any) => {
              event.stopPropagation();
              handleFavorite(book);
            }}
            style={{
              backgroundColor: favorites.has(book.url) ? 'gold' : '#ddd',
              padding: '3px 7px',
              cursor: 'pointer',
              borderRadius: '50%',
            }}
          >
            {favorites.has(book.url) ? '★' : '☆'}
          </button>
        </div>
        <img
          src={getCoverFile({ isbn: book.isbn })}
          style={{
            backgroundImage: `url(${defaultBook})`,
          }}
        />
      </div>

      <div className="book-info">
        <h3>{book.name}</h3>
        <p>{book.authors[0]}</p>
      </div>
    </div>
  );
};

export default Book;
