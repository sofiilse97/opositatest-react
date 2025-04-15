import { useLibrary } from '@/context/hooks/useLibrary';
import { BookType } from '@/types/book';

export const useBooks = () => {
  const { libraryState, setLibraryState } = useLibrary();
  const {
    books,
    searchQuery,
    favorites,
    recentBooks,
    isSortedAsc,
    sortedBooks,
  } = libraryState;

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
    const newRecents = new Map(recentBooks || []);
    newRecents.set(bk.url, bk);

    setLibraryState({
      selectedBook: bk,
      recentBooks: newRecents,
    });
  };

  /**
   * Add or remove a book from favorites
   * @param bk the book to add or remove
   */
  const handleFavorite = (bk: BookType) => {
    const newFavorites = new Map(favorites || []);
    if (newFavorites.has(bk.url)) {
      newFavorites.delete(bk.url);
    } else {
      newFavorites.set(bk.url, bk);
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
    booksData,
    sortedBooksData,
    handleSort,
    handleSortWithOpt,
    handleBook,
    handleFavorite,
  };
};
