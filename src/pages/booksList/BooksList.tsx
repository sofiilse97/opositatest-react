import React, { useEffect } from 'react';
import './booksList.css';
import SearchBar from '../../components/search/SearchBar';
import Book from '../../components/book/Book';
import BookModal from '../../components/book/modal/BookModal';
import { BookType } from '../../types/book.d';
import { useBooks } from '../../hooks/useBooks';

const BooksList: React.FC = () => {
  const {
    initBooks,
    booksData,
    sortedBooksData,
    handleSort,
    handleBook,
    handleFavorite,
    libros,
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
          <p>
            <strong>Libros encontrados:</strong> {booksData().length}
          </p>

          <button style={{ marginBottom: '10px' }} onClick={handleSort}>
            {isSortedAsc ? 'Ordenar Descendente' : 'Ordenar Ascendente'}
          </button>

          {recentBooks.size > 0 && (
            <div>
              <h3>Recientes</h3>
              {Array.from(recentBooks).map((url) => {
                const book = libros.find((b) => b.url === url);
                console.log(book);
                return book ? (
                  <div style={{ marginBottom: '10px' }}>
                    <button onClick={() => handleBook(book)}>
                      {book.name}
                    </button>
                  </div>
                ) : null;
              })}
              <h3>Lista de libros</h3>
            </div>
          )}

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
