import React, { useEffect } from 'react';
import './booksList.css';
import SearchBar from '../../components/search/SearchBar';
import Book from '../../components/book/book/Book';
import BookModal from '../../components/book/modal/BookModal';
import { BookType } from '../../types/book.d';
import { useBooks } from '../../hooks/useBooks';
import RecentBooks from '../../components/book/recent/RecentBooks';
import { useLibrary } from '../../context/hooks/useLibrary';
import Select from '../../components/ui/select/Select';

const BooksList: React.FC = () => {
  const {
    initBooks,
    booksData,
    sortedBooksData,
    handleSortWithOpt,
    handleBook,
    handleFavorite,
    loading,
    error,
  } = useBooks();

  const { libraryState, setLibraryState } = useLibrary();

  useEffect(() => {
    initBooks();
  }, []);

  if (loading) return <p>Cargando...</p>;

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

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
