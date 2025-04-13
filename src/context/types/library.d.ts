interface LibraryState {
  books: BookType[] | null;
  searchQuery: string | null;
  favorites: Map<string, object> | null;
  recentBooks: Set<string> | null;
  selectedBook: BookType | null;
  isSortedAsc: boolean | null;
  sortedBooks: BookType[] | null;
}

interface LibraryContextType {
  libraryState: LibraryState;
  setLibraryState: (value: Partial<LibraryState>) => void;
}
