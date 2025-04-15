import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import { BookType } from '@/types/book';
import { useLibrary } from '@/context/hooks/useLibrary';
import { getCoverFile } from '@/api/constants/books';
import { parseYear } from '@/utils/dates/dateUtil';
import Button from '@/components/ui/button/Button';
import './bookModal.css';

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

  useEffect(() => {
    // Bloquear el scroll del fondo cuando el modal está abierto
    if (selectedBook) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [selectedBook]);

  if (selectedBook == null) return null;

  return createPortal(
    <div className="book-modal-overlay">
      <div className="book-modal-content">
        <div className="book-modal-close">
          <button
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
          <Button onClick={() => handleFavorite(selectedBook)}>
            {favorites.has(selectedBook.url)
              ? 'Quitar de favoritos'
              : 'Agregar a favoritos'}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BookModal;
