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
    <div>
      <h3>Recientes</h3>
      {Array.from(recentBooks).map((url) => {
        const book = books.find((b) => b.url === url);
        console.log(book);
        return book ? (
          <div style={{ marginBottom: '10px' }}>
            <button onClick={() => handleBook(book)}>{book.name}</button>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default RecentBooks;
