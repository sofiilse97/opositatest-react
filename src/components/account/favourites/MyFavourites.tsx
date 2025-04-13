import React from 'react';
import { useBooks } from '../../../hooks/useBooks';

const MyFavourites: React.FC = () => {
  const { handleBook, favorites, books } = useBooks();

  return (
    <div>
      <h3>Mis libros favoritos</h3>
      {favorites.size === 0 && <p>No tienes libros favoritos.</p>}

      <ul>
        {Array.from(favorites).map((url) => {
          const book = books.find((b) => b.url === url);
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
