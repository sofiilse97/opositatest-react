import { getCoverFile } from '../../api/constants/books';
import { BookType } from '../../types/book';

const Book = ({
  key,
  handleBook,
  handleFavorite,
  book,
  favorites,
}: {
  key: string | number;
  handleBook: (bk: BookType) => void;
  handleFavorite: (b: BookType) => void;
  book: BookType;
  favorites: Set<string>;
}) => {
  return (
    <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
      <img src={getCoverFile({ isbn: book.isbn })} />
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
  );
};

export default Book;
