import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import { BookType } from '@/types/book';
import { useLibrary } from '@/context/hooks/useLibrary';
import { getCoverFile } from '@/api/search/books';
import { parseYear } from '@/utils/dates/dateUtil';
import Button from '@/components/ui/button/Button';
import './bookModal.css';

/**
 * Componente de modal para mostrar los detalles de un libro.
 * Permite ver información detallada y agregarlo a favoritos.
 *
 * @param {BookType | null} selectedBook - Libro seleccionado para mostrar.
 * @param {Function} handleFavorite - Función para manejar la acción de agregar a favoritos.
 * @param {Set<string>} favorites - Conjunto de libros favoritos.
 * @returns {JSX.Element | null} Componente BookModal
 */
const BookModal = ({
  selectedBook,
  handleFavorite,
  favorites,
}: {
  selectedBook: BookType | null;
  handleFavorite: (b: BookType) => void;
  favorites: Set<string>;
}) => {
  const { setLibraryState } = useLibrary();

  // Estado para manejar si el libro es favorito o no
  const [isFavourite, setIsFavourite] = useState(
    (selectedBook && favorites.has(selectedBook?.url)) ?? false
  );

  useEffect(() => {
    if (selectedBook) setIsFavourite(favorites.has(selectedBook?.url));
  }, [favorites]);

  useEffect(() => {
    // Bloquear el scroll del fondo cuando el modal está abierto
    if (selectedBook) {
      document.body.classList.add('no-scroll');
    } else {
      // Restablecer el scroll del fondo
      document.body.classList.remove('no-scroll');
    }

    return () => {
      // Restablecer el scroll del fondo
      document.body.classList.remove('no-scroll');
    };
  }, [selectedBook]);

  if (selectedBook == null) return null;

  return createPortal(
    <div className="book-modal-overlay">
      <div className="book-modal-content">
        <div className="book-modal-close">
          <button
            data-testid="book-modal-close-btn"
            className="close-btn"
            onClick={() => setLibraryState({ selectedBook: null })}
          >
            <IoMdClose />
          </button>
        </div>
        <div className="book-modal-header">
          <h2>{selectedBook.name}</h2>
        </div>
        <div className="book-modal-body">
          <div className="book-modal-image">
            <img
              src={getCoverFile({ isbn: selectedBook.isbn })}
              alt={`Portada de ${selectedBook.name}`}
            />
          </div>
          <h2>Detalles del libro</h2>
          <p>
            <strong>Autor:</strong> {selectedBook.authors.join(', ')}
          </p>
          <p>
            <strong>Editorial:</strong> {selectedBook.publisher}
          </p>
          <p>
            <strong>Año:</strong> {parseYear(selectedBook.released)} |{' '}
            <strong>País: </strong> {selectedBook.country}
          </p>
          <p>
            <strong>Medio: </strong> {selectedBook.mediaType}
          </p>
          <p>
            <strong>ISBN: </strong> {selectedBook.isbn}
          </p>

          <h2>Sobre el libro</h2>
          <p>
            <strong>Páginas:</strong> {selectedBook.numberOfPages}
          </p>
          <p>
            <strong>Número de personajes:</strong>{' '}
            {selectedBook.characters.length}
          </p>
        </div>
        <div className="book-modal-footer">
          <Button
            variant="outline"
            onClick={() => window.open(selectedBook.url, '_blank')}
          >
            Abrir API en el navegador
          </Button>
          <Button
            variant={isFavourite ? 'outline' : 'default'}
            onClick={() => handleFavorite(selectedBook)}
          >
            {isFavourite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BookModal;
