import { useState } from 'react';
import { LibraryContext } from './LibraryContext';

const initialState: LibraryState = {
  page: 1,
  books: [],
  searchQuery: '',
  favorites: new Map(),
  recentBooks: new Set(),
  selectedBook: null,
  isSortedAsc: true,
  sortedBooks: [],
};

const LibraryProvider = ({ children }: { children: any }) => {
  const [libraryState, setLibraryState] = useState<LibraryState>(initialState);

  const updateLibraryState = (value: Partial<LibraryState>) => {
    setLibraryState((prevState) => ({
      ...prevState,
      ...value,
    }));
  };

  return (
    <LibraryContext.Provider
      value={{ libraryState, setLibraryState: updateLibraryState }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export default LibraryProvider;
