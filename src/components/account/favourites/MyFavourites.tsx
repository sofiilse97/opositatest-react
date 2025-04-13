import React from 'react';
import { useBooks } from '../../../hooks/useBooks';
import { useLibrary } from '../../../context/hooks/useLibrary';

const MyFavourites: React.FC = () => {
  const { handleBook } = useBooks();
  const { libraryState } = useLibrary();

  return (
    <div>
      <h3>Mis libros favoritos</h3>
      {libraryState.favorites.size === 0 && <p>No tienes libros favoritos.</p>}

      <ul>
        {Array.from(libraryState.favorites).map((url) => {
          const book = libraryState.books.find((b) => b.url === url);
          return book ? (
            <button
              style={{ minWidth: '180px' }}
              onClick={() => handleBook(book)}
            >
              {book.name}
            </button>
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default MyFavourites;
