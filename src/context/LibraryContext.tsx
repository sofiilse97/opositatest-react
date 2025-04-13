import { createContext } from 'react';
import { LibraryContextType } from '../types/library';

export const LibraryContext = createContext<LibraryContextType | null>({
  books: null,
  setBooks: () => {},
  searchQuery: null,
  setSearchQuery: () => {},
  favorites: null,
  setFavorites: () => {},
  recentBooks: null,
  setRecentBooks: () => {},
  selectedBook: null,
  setSelectedBook: () => {},
  isSortedAsc: null,
  setIsSortedAsc: () => {},
  sortedBooks: null,
  setSortedBooks: () => {},
});
