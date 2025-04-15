import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getCoverFile, searchBook } from '../../api/search/books';
import { BookType } from '../../types/book';
import { parseYear } from '../../utils/dates/dateUtil';

import './bookData.css';

const BookData = () => {
  const { url } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<BookType | null>(null);

  useEffect(() => {
    searchBookFn();
  }, [url]);

  const searchBookFn = async () => {
    try {
      if (!url) return;
      const decodedUrl = decodeURIComponent(url);
      const response = await searchBook(decodedUrl);
      const data = await response.json();
      setBook(data);
    } catch (error) {
    } finally {
    }
  };

  return (
    <div>
      <div onClick={() => navigate('/')}> Volver</div>

      {book && (
        <div style={{ padding: '20px' }}>
          <h2>{book.name}</h2>

          <div className="book-card">
            <img src={getCoverFile({ isbn: book.isbn })} />
            <div>
              <p>
                <strong>Autor:</strong> {book.authors.join(', ')}
              </p>
              <p>
                <strong>Editorial:</strong> {book.publisher}
              </p>
              <p>
                <strong>Páginas:</strong> {book.numberOfPages}
              </p>
              <p>
                <strong>Año:</strong> {parseYear(book.released)}
              </p>
              <p>
                <strong>ISBN: </strong>
                {book.isbn}
              </p>
            </div>
          </div>

          <button
            onClick={() => window.open(book.url, '_blank')}
            style={{
              backgroundColor: '#02874a',
              color: 'white',
              padding: '10px',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            Abrir API en el navegador
          </button>
        </div>
      )}
    </div>
  );
};

export default BookData;
