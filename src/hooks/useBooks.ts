import { useState } from 'react';
import lodash from 'lodash';
import { BookType } from '../types/book';
import { searchBooks } from '../api/constants/books';
import { useNavigate } from 'react-router';

export const useBooks = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [recentBooks, setRecentBooks] = useState<Set<string>>(new Set());
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [isSortedAsc, setIsSortedAsc] = useState<boolean>(true); // Check the sorting status
  const [sortedBooks, setSortedBooks] = useState<BookType[]>([]);
  const navigate = useNavigate();

  // Obtenemos los libros
  const initBooks = async () => {
    setLoading(true);
    try {
      const response = await searchBooks();
      const data = await response.json();

      setBooks(data);
      setError(null);
    } catch (error) {
      setError('Error fetching books');
    } finally {
      setLoading(false);
    }
  };

  const booksData = () => {
    return lodash.filter(books, (b: BookType) =>
      lodash.includes(lodash.toLower(b.name), lodash.toLower(searchQuery))
    );
  };

  const sortedBooksData = () => {
    return lodash.filter(sortedBooks, (b: BookType) =>
      lodash.includes(lodash.toLower(b.name), lodash.toLower(searchQuery))
    );
  };

  // Sort the books by name
  const handleSort = () => {
    const sortedBooks = books.sort((a, b) => {
      if (isSortedAsc) {
        return a.name.localeCompare(b.name); // Orden ascendente
      } else {
        return b.name.localeCompare(a.name); // Orden descendente
      }
    });
    setSortedBooks(sortedBooks);
    setIsSortedAsc(!isSortedAsc); // Cambiar la dirección del orden
  };

  // Presiona un libro
  const handleBook = (bk: BookType) => {
    // setSelectedBook(bk);
    setRecentBooks((prev) => new Set(prev).add(bk.url));
    navigate(`/book/${encodeURIComponent(bk.url)}`);
  };

  // Press the favorites button
  const handleFavorite = (b: BookType) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(b.url)) {
        newFavorites.delete(b.url);
      } else {
        newFavorites.add(b.url);
      }
      return newFavorites;
    });
  };

  // TODO: remove???
  //   const handleAddBooksStartingWithA = () => {
  //     const booksStartingWithA = libros.filter((book: any) =>
  //       book.name.toLowerCase().startsWith('a')
  //     );

  //     setLibros((prevLibros) => [...prevLibros, ...booksStartingWithA]);
  //   };

  return {
    initBooks,
    booksData,
    sortedBooksData,
    handleSort,
    handleBook,
    handleFavorite,
    books,
    setBooks,
    loading,
    setLoading,
    error,
    setError,
    searchQuery,
    setSearchQuery,
    favorites,
    setFavorites,
    recentBooks,
    setRecentBooks,
    selectedBook,
    setSelectedBook,
    isSortedAsc,
    setIsSortedAsc,
    sortedBooks,
    setSortedBooks,
  };
};
