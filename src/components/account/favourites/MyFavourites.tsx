import React from 'react';
import { useBooks } from '@/hooks/useBooks';
import { useLibrary } from '@/context/hooks/useLibrary';
import { BookType } from '@/types/book';
import { getCoverFile } from '@/api/constants/books';
import Button from '@/components/ui/button/Button';
import BookModal from '@/components/book/modal/BookModal';
import './myFavourites.css';

const MyFavourites: React.FC = () => {
  const { handleBook, handleFavorite } = useBooks();
  const { libraryState } = useLibrary();

  return (
    <div>
      <h3 className="favourites">
        Mis libros favoritos: {libraryState.favorites.size}
      </h3>

      {libraryState.favorites.size > 0 ? (
        <>
          <table className="favourites-table">
            <thead>
              <tr>
                <th>Portada</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(
                libraryState.favorites.entries() as [string, BookType][]
              ).map(([url, book]) => (
                <tr key={url}>
                  <td>
                    <img src={getCoverFile({ isbn: book.isbn })} />
                  </td>
                  <td>{book.name}</td>
                  <td>
                    <Button onClick={() => handleBook(book)}>
                      Ver detalles
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No tienes libros favoritos.</p>
      )}
      {libraryState.selectedBook && (
        <BookModal
          selectedBook={libraryState.selectedBook}
          handleFavorite={handleFavorite}
          favorites={libraryState.favorites}
        />
      )}
    </div>
  );
};

export default MyFavourites;
