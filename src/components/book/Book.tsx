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
    <div
      key={key}
      style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
      onClick={() => handleBook(book)}
    >
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
          height={280}
          width={180}
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
        />
      </div>

      <p
        style={{
          margin: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {book.name}
      </p>
    </div>
  );
};

export default Book;
