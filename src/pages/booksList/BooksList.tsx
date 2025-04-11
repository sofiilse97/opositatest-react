import React, { useEffect } from 'react';
import './booksList.css';
import SearchBar from '../../components/search/SearchBar';
import Book from '../../components/book/book/Book';
import BookModal from '../../components/book/modal/BookModal';
import { BookType } from '../../types/book.d';
import { useBooks } from '../../hooks/useBooks';
import RecentBooks from '../../components/book/recent/RecentBooks';

const BooksList: React.FC = () => {
  const {
    initBooks,
    booksData,
    sortedBooksData,
    handleSort,
    handleBook,
    handleFavorite,
    books,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    favorites,
    recentBooks,
    selectedBook,
    setSelectedBook,
    isSortedAsc,
    sortedBooks,
  } = useBooks();

  useEffect(() => {
    initBooks();
  }, [favorites]);

  if (loading) return <p>Cargando...</p>;

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          initBooks={initBooks}
        />

        <div className="body">
          {recentBooks.size > 0 && (
            <RecentBooks
              recentBooks={recentBooks}
              books={books}
              handleBook={handleBook}
            />
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              width: '100%',
            }}
          >
            <h3>{booksData().length} resultados</h3>
            <button onClick={handleSort}>
              {isSortedAsc ? 'Ordenar Descendente' : 'Ordenar Ascendente'}
            </button>
          </div>

          <div className="books-list">
            {sortedBooks.length > 0
              ? sortedBooksData().map((book: BookType, index) => (
                  <Book
                    key={index}
                    handleBook={handleBook}
                    handleFavorite={handleFavorite}
                    book={book}
                    favorites={favorites}
                  />
                ))
              : booksData().map((book: BookType, index) => (
                  <Book
                    key={index}
                    handleBook={handleBook}
                    handleFavorite={handleFavorite}
                    book={book}
                    favorites={favorites}
                  />
                ))}
          </div>
        </div>

        {selectedBook && (
          <BookModal
            selectedBook={selectedBook}
            handleFavorite={handleFavorite}
            favorites={favorites}
            setSelectedBook={setSelectedBook}
          />
        )}
      </div>
    </>
  );
};

export default BooksList;
