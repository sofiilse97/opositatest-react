import React, { useEffect } from 'react';
import SearchBar from '../../components/search/SearchBar';
import Book from '../../components/book/book/Book';
import BookModal from '../../components/book/modal/BookModal';
import { BookType } from '../../types/book.d';
import { useBooks } from '../../hooks/useBooks';
import RecentBooks from '../../components/book/recent/RecentBooks';
import { useLibrary } from '../../context/hooks/useLibrary';
import Select from '../../components/ui/select/Select';
import { useSearchBookQuery } from '../../api/queries/search/useSearchBookQueries';
import Paginator from '../../components/ui/paginator/Paginator';
import './booksList.css';

const BooksList: React.FC = () => {
  const {
    booksData,
    sortedBooksData,
    handleSortWithOpt,
    handleBook,
    handleFavorite,
  } = useBooks();

  const { libraryState, setLibraryState } = useLibrary();

  const {
    data: booksQueryData,
    isLoading,
    isError,
  } = useSearchBookQuery({
    page: libraryState.page,
  });

  useEffect(() => {
    setLibraryState({ books: booksQueryData });
  }, [booksQueryData]);

  if (isLoading) return <p>Cargando...</p>;

  if (isError) return <p style={{ color: 'red' }}>Ups</p>;

  return (
    <>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div className="body">
          <SearchBar />
          {libraryState.recentBooks.size > 0 && (
            <RecentBooks
              recentBooks={libraryState.recentBooks}
              books={libraryState.books}
              handleBook={handleBook}
            />
          )}

          <div className="result-container">
            <h3>{booksData().length} resultados</h3>
            <Select
              options={[
                { label: 'Ordenar por: Descendente', value: 'false' },
                { label: 'Ordenar por: Ascendente', value: 'true' },
              ]}
              onChange={(value) => handleSortWithOpt(value === 'true')}
              value={libraryState.isSortedAsc.toString()}
            />
          </div>

          <div className="books-list">
            {libraryState.sortedBooks.length > 0
              ? sortedBooksData().map((book: BookType, index) => (
                  <Book key={index} book={book} />
                ))
              : booksData().map((book: BookType, index) => (
                  <Book key={index} book={book} />
                ))}
          </div>
          <Paginator
            backDisabled={libraryState.page === 1}
            nextDisabled={booksQueryData?.length < 10}
            setBack={() => setLibraryState({ page: libraryState.page - 1 })}
            setNext={() => setLibraryState({ page: libraryState.page + 1 })}
          />
        </div>

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
