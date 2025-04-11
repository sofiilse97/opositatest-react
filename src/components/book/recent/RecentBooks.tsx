import { BookType } from '../../../types/book';

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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        {Array.from(recentBooks).map((url) => {
          const book = books.find((b) => b.url === url);
          return book ? (
            <button onClick={() => handleBook(book)}>{book.name}</button>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default RecentBooks;
