import { useEffect, useState } from 'react';
import './book.css';
import { BookType } from '@/types/book';
import { useBooks } from '@/hooks/useBooks';
import { useLibrary } from '@/context/hooks/useLibrary';
import { getCoverFile } from '@/api/search/books';
import BookImage from '@/components/ui/image/BookImage';

const Book = ({
  key,
  book,
}: {
  key: string | number;

  book: BookType;
}) => {
  const { handleBook, handleFavorite } = useBooks();
  const { libraryState } = useLibrary();

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(libraryState.favorites.has(book.url));
  }, [libraryState.favorites, book.url]);

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
            className={'favourite-star ' + (isFavorite ? 'is-fav' : '')}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
        <BookImage src={getCoverFile({ isbn: book.isbn })} />
      </div>

      <div className="book-info">
        <h3 className="ellipsis">{book.name}</h3>
        <p className="ellipsis">{book.authors[0]}</p>
      </div>
    </div>
  );
};

export default Book;
