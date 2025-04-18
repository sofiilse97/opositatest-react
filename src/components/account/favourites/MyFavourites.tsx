import React from 'react';
import { useBooks } from '@/hooks/useBooks';
import { useLibrary } from '@/context/hooks/useLibrary';
import { BookType } from '@/types/book';
import { getCoverFile } from '@/api/search/books';
import Button from '@/components/ui/button/Button';
import BookModal from '@/components/book/modal/BookModal';
import './myFavourites.css';

/**
 * Componente que muestra los libros favoritos del usuario.
 * Permite ver detalles de cada libro y agregarlo/eliminarlo de favoritos.
 *
 * @returns {JSX.Element} Componente MyFavourites
 */
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
