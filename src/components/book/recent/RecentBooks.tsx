import { BookType } from '@/types/book';
import BookImage from '@/components/ui/image/BookImage';

import './recentBooks.css';
import { getCoverFile } from '@/api/search/books';
import { useLibrary } from '@/context/hooks/useLibrary';

const RecentBooks = () => {
  const { libraryState, setLibraryState } = useLibrary();

  const handleBook = (bk: BookType) => {
    const newRecents = new Map(libraryState.recentBooks || []);
    newRecents.set(bk.url, bk);

    setLibraryState({
      selectedBook: bk,
      recentBooks: newRecents,
    });
  };

  return (
    libraryState.recentBooks.size > 0 && (
      <div style={{ width: '100%' }}>
        <h3>Recientes</h3>
        <div className="recent-books-container">
          {Array.from(
            libraryState.recentBooks.entries() as [string, BookType][]
          ).map(([url, book]) => (
            <div
              className="recent-book"
              key={`recents-${url}`}
              onClick={() => handleBook(book)}
            >
              <BookImage src={getCoverFile({ isbn: book.isbn })} />
              <p>{book.name}</p>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default RecentBooks;
