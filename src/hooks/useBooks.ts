import { useLibrary } from '@/context/hooks/useLibrary';
import { BookType } from '@/types/book';

/**
 * Hook personalizado para gestionar libros en una biblioteca.
 * Proporciona funcionalidades para filtrar, ordenar, seleccionar y gestionar favoritos.
 */
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
   * Filtra libros por consulta de búsqueda
   * @param books array de libros a filtrar
   * @param query la consulta de búsqueda
   */
  const filterBooks = (books: BookType[], query: string): BookType[] => {
    if (!books || books.length === 0) return [];

    // No es necesario usar lodash, JavaScript tiene un método incorporado para filtrar arrays
    return books.filter((b) =>
      b.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  /**
   * Devuelve los libros filtrados por la consulta de búsqueda
   */
  const booksData = (): BookType[] => filterBooks(books, searchQuery);

  /**
   * Devuelve los libros ordenados y filtrados por la consulta de búsqueda
   */
  const sortedBooksData = (): BookType[] =>
    filterBooks(sortedBooks, searchQuery);

  /**
   * Ordena los libros por nombre
   * @param books array de libros a ordenar
   * @param sortDir true para ascendente, false para descendente
   */
  const sortBooks = (books: BookType[], sortDir: boolean) => {
    // Se agrega [...books] para evitar mutar el array original y ordenar los libros por nombre
    return [...books].sort((a, b) =>
      sortDir ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  };

  /**
   * TODO: eliminar no se utiliza
   * Ordena los libros por nombre
   */
  const handleSort = () => {
    const sorted = sortBooks(books, isSortedAsc);
    setLibraryState({ sortedBooks: sorted, isSortedAsc: !isSortedAsc });
  };

  /**
   * Ordena los libros por nombre pasando la dirección
   * @param sortDir true para ascendente, false para descendente
   */
  const handleSortWithOpt = (sortDir: boolean) => {
    if (sortDir === isSortedAsc) return;

    const sorted = sortBooks(books, sortDir);
    setLibraryState({ sortedBooks: sorted, isSortedAsc: sortDir });
  };

  /**
   * Abre los detalles del libro y guarda el libro en los libros recientes
   * @param bk el libro a establecer como seleccionado
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
   * Agrega o elimina un libro de favoritos
   * @param bk el libro a agregar o eliminar
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
