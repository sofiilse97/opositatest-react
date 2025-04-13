import { useState } from 'react';
import { LibraryContext } from './LibraryContext';
import { BookType } from '../types/book';

const LibraryProvider = ({ children }: { children: any }) => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [recentBooks, setRecentBooks] = useState<Set<string>>(new Set());
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [isSortedAsc, setIsSortedAsc] = useState<boolean>(true); // Check the sorting status
  const [sortedBooks, setSortedBooks] = useState<BookType[]>([]);

  return (
    <LibraryContext.Provider
      value={{
        books,
        setBooks,
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
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export default LibraryProvider;
