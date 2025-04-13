interface LibraryContextType {
  books: BookType[] | null;
  setBooks: (value: BookType[] | null) => void;

  searchQuery: string | null;
  setSearchQuery: (value: string | null) => void;

  favorites: Map<string, object> | null;
  setFavorites: (value: Map<string, object> | null) => void;

  recentBooks: Set<string> | null;
  setRecentBooks: (value: Set<string> | null) => void;

  selectedBook: BookType | null;
  setSelectedBook: (value: BookType | null) => void;

  isSortedAsc: boolean | null;
  setIsSortedAsc: (value: boolean | null) => void;

  sortedBooks: BookType[] | null;
  setSortedBooks: (value: BookType[] | null) => void;
}
