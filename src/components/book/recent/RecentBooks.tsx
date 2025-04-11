const RecentBooks = ({
  recentBooks,
  libros,
  handleBook,
}: {
  recentBooks: Set<string>;
  libros: any;
  handleBook: any;
}) => {
  return (
    <div>
      {Array.from(recentBooks).map((url) => {
        const book = libros.find((b) => b.url === url);
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
