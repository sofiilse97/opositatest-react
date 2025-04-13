import { useState } from 'react';
import { BookType } from '../types/book';
import { searchBooks } from '../api/constants/books';
import { useLibrary } from '../context/hooks/useLibrary';

export const useBooks = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { libraryState, setLibraryState } = useLibrary();
  const {
    books,
    searchQuery,
    favorites,
    recentBooks,
    selectedBook,
    isSortedAsc,
    sortedBooks,
  } = libraryState;

  /**
   * Initialize the books
   */
  const initBooks = async () => {
    setLoading(true);

    try {
      const response = await searchBooks();
      const data = await response.json();

      setLibraryState({ books: data });
      setError(null);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Error fetching books');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Filer books by query
   * @param books array of books to filter
   * @param query the search query
   */
  const filterBooks = (books: BookType[], query: string): BookType[] => {
    if (!books || books.length === 0) return [];

    // remove lodash beacause it is not necessary, javascript has a built-in method to filter arrays
    return books.filter((b) =>
      b.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  /**
   * Returns the books filtered by the search query
   */
  const booksData = (): BookType[] => filterBooks(books, searchQuery);

  /**
   * Returns the books sorted and filtered by the search query
   */
  const sortedBooksData = (): BookType[] =>
    filterBooks(sortedBooks, searchQuery);

  /**
   * Sorting books by name
   * @param books array of books to sorting
   * @param sortDir true for ascending, false for descending
   */
  const sortBooks = (books: BookType[], sortDir: boolean) => {
    // add [...books] to avoid mutating the original array and sort the books by name
    return [...books].sort((a, b) =>
      sortDir ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  };

  /**
   * Sort the books by name
   */
  const handleSort = () => {
    const sorted = sortBooks(books, isSortedAsc);
    setLibraryState({ sortedBooks: sorted, isSortedAsc: !isSortedAsc });
  };

  /**
   * Sort the books by name passing the direction
   * @param sortDir true for ascending, false for descending
   */
  const handleSortWithOpt = (sortDir: boolean) => {
    if (sortDir === isSortedAsc) return;

    const sorted = sortBooks(books, sortDir);
    setLibraryState({ sortedBooks: sorted, isSortedAsc: sortDir });
  };

  /**
   * Open the book details and save the book in recent books
   * @param bk the book to set as selected
   */
  const handleBook = (bk: BookType) => {
    // setSelectedBook(bk);
    // // add return to identify correctly the change
    // setRecentBooks((prev) => {
    //   const newSet = new Set(prev);
    //   newSet.add(bk.url);
    //   return newSet;
    // });

    setLibraryState({
      selectedBook: bk,
      recentBooks: new Set([...(recentBooks || []), bk.url]),
    });
  };

  /**
   * Add or remove a book from favorites
   * @param b the book to add or remove
   */
  const handleFavorite = (b: BookType) => {
    const newFavorites = new Map(favorites || []);
    if (newFavorites.has(b.url)) {
      newFavorites.delete(b.url);
    } else {
      newFavorites.set(b.url, b);
    }

    setLibraryState({ favorites: newFavorites });
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
    handleSortWithOpt,
    handleBook,
    handleFavorite,
    loading,
    setLoading,
    error,
    setError,
  };
};
