import React, { useEffect } from 'react';
import { useBooks } from '@/hooks/useBooks';
import { useLibrary } from '@/context/hooks/useLibrary';
import { useSearchBookQuery } from '@/api/queries/search/useSearchBookQueries';
import SearchBar from '@/components/search/SearchBar';
import RecentBooks from '@/components/book/recent/RecentBooks';
import Select from '@/components/ui/select/Select';
import { BookType } from '@/types/book';
import Book from '@/components/book/book/Book';
import Paginator from '@/components/ui/paginator/Paginator';
import BookModal from '@/components/book/modal/BookModal';

import './booksList.css';
import List from '@/components/ui/list/List';

/**
 * Componente principal de la página de libros.
 * Muestra una lista de libros, permite buscar, ordenar y ver detalles de cada libro.
 *
 * @returns {JSX.Element} Componente BooksList
 */
const BooksList: React.FC = () => {
  const {
    booksData,
    sortedBooksData,
    handleSortWithOpt,
    handleBook,
    handleFavorite,
    booksQueryData,
    isLoading,
    isError,
  } = useBooks();

  const { libraryState, setLibraryState } = useLibrary();

  if (isLoading) return <p>Cargando...</p>;

  if (isError) return <p style={{ color: 'red' }}>Ups</p>;

  return (
    <>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div className="body">
          {/** Input de busqueda por texto y botón actualizar */}
          <SearchBar />
          {/** Linros seleccionado recientemente */}
          {libraryState.recentBooks.size > 0 && (
            <RecentBooks
              recentBooks={libraryState.recentBooks}
              handleBook={handleBook}
            />
          )}

          <div className="result-container">
            <h3>{booksData().length} resultados</h3>
            {/** Selector de ordenación */}
            <Select
              options={[
                { label: 'Ordenar por: Descendente', value: 'false' },
                { label: 'Ordenar por: Ascendente', value: 'true' },
              ]}
              onChange={(value) => handleSortWithOpt(value === 'true')}
              value={libraryState.isSortedAsc.toString()}
            />
          </div>

          {/** Listado de los libnros */}
          <List>
            {libraryState.sortedBooks.length > 0
              ? sortedBooksData().map((book: BookType) => <Book book={book} />)
              : booksData().map((book: BookType) => <Book book={book} />)}
          </List>
          {/** Paginador */}
          <Paginator
            backDisabled={libraryState.page === 1}
            nextDisabled={booksQueryData?.length < 10}
            setBack={() => setLibraryState({ page: libraryState.page - 1 })}
            setNext={() => setLibraryState({ page: libraryState.page + 1 })}
          />
        </div>

        {/** Modal con más información del libro seleccionado */}
        {libraryState.selectedBook && (
          <BookModal
            selectedBook={libraryState.selectedBook}
            handleFavorite={handleFavorite}
            favorites={libraryState.favorites}
          />
        )}
      </div>
    </>
  );
};

export default BooksList;
