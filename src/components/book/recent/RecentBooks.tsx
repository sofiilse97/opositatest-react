import { BookType } from '@/types/book';
import BookImage from '@/components/ui/image/BookImage';

import './recentBooks.css';
import { getCoverFile } from '@/api/constants/books';
const RecentBooks = ({
  recentBooks,
  books,
  handleBook,
}: {
  recentBooks: Set<string>;
  books: BookType[];
  handleBook: (bk: BookType) => void;
}) => {
  return (
    <div style={{ width: '100%' }}>
      <h3>Recientes</h3>
      <div className="recent-books-container">
        {Array.from(recentBooks).map((url) => {
          const book = books?.find((b) => b.url === url);
          return book ? (
            <div
              className="recent-book"
              key={`recents-${book.url}`}
              onClick={() => handleBook(book)}
            >
              <BookImage src={getCoverFile({ isbn: book.isbn })} />
              <p>{book.name}</p>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default RecentBooks;
