import { BookType } from '@/types/book';
import BookImage from '@/components/ui/image/BookImage';

import './recentBooks.css';
import { getCoverFile } from '@/api/constants/books';

const RecentBooks = ({
  recentBooks,
  handleBook,
}: {
  recentBooks: Map<string, BookType>;

  handleBook: (bk: BookType) => void;
}) => {
  return (
    <div style={{ width: '100%' }}>
      <h3>Recientes</h3>
      <div className="recent-books-container">
        {Array.from(recentBooks.entries()).map(([url, book]) => (
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
  );
};

export default RecentBooks;
