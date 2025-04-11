import React, { useEffect, useState } from 'react'
import lodash from 'lodash'
import './booksList.css'
import SearchBar from '../../components/search/SearchBar'
import Book from '../../components/book/Book'
import BookModal from '../../components/book/modal/BookModal'

const BooksList: React.FC = () => {
  const [libros, setLibros] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [recentBooks, setRecentBooks] = useState<Set<string>>(new Set())
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [isSortedAsc, setIsSortedAsc] = useState<boolean>(true) // Check the sorting status
  const [sortedBooks, setSortedBooks] = useState([])

  useEffect(() => {
    initBooks()
  }, [favorites])

  // Obtenemos los libros
  const initBooks = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://anapioficeandfire.com/api/books')
      const data = await response.json()
      setLibros(data)
      setError(null)
    } catch (error) {
      setError('Error fetching books')
    } finally {
      setLoading(false)
    }
  }

  const booksData = () => {
    return lodash.filter(libros, (b: any) =>
      lodash.includes(lodash.toLower(b.name), lodash.toLower(searchQuery))
    )
  }

  const sortedBooksData = () => {
    return lodash.filter(sortedBooks, (b: any) =>
      lodash.includes(lodash.toLower(b.name), lodash.toLower(searchQuery))
    )
  }

  // Sort the books by name
  const handleSort = () => {
    const sortedBooks = libros.sort((a, b) => {
      if (isSortedAsc) {
        return a.name.localeCompare(b.name) // Orden ascendente
      } else {
        return b.name.localeCompare(a.name) // Orden descendente
      }
    })
    setSortedBooks(sortedBooks as any)
    setIsSortedAsc(!isSortedAsc) // Cambiar la dirección del orden
  }

  // Presiona un libro
  const handleBook = (bk: any) => {
    setSelectedBook(bk)
    setRecentBooks((prev) => new Set(prev).add(bk.url))
  }

  // Press the favorites button
  const handleFavorite = (b: any) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(b.url)) {
        newFavorites.delete(b.url)
      } else {
        newFavorites.add(b.url)
      }
      return newFavorites
    })
  }

  // TODO: remove???
  //   const handleAddBooksStartingWithA = () => {
  //     const booksStartingWithA = libros.filter((book: any) =>
  //       book.name.toLowerCase().startsWith('a')
  //     );

  //     setLibros((prevLibros) => [...prevLibros, ...booksStartingWithA]);
  //   };

  if (loading) return <p>Cargando...</p>

  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          initBooks={initBooks}
        />

        <div className="body">
          <p>
            <strong>Libros encontrados:</strong> {booksData().length}
          </p>

          <button style={{ marginBottom: '10px' }} onClick={handleSort}>
            {isSortedAsc ? 'Ordenar Descendente' : 'Ordenar Ascendente'}
          </button>

          {recentBooks.size > 0 && (
            <div>
              <h3>Recientes</h3>
              {Array.from(recentBooks).map((url) => {
                const book = libros.find((b) => b.url === url)
                console.log(book)
                return book ? (
                  <div style={{ marginBottom: '10px' }}>
                    <button onClick={() => handleBook(book)}>
                      {book.name}
                    </button>
                  </div>
                ) : null
              })}
              <h3>Lista de libros</h3>
            </div>
          )}

          <div className="books-list">
            {sortedBooks.length > 0
              ? sortedBooksData().map((book: any, index) => (
                  <Book
                    key={index}
                    handleBook={handleBook}
                    handleFavorite={handleFavorite}
                    book={book}
                    favorites={favorites}
                  />
                ))
              : booksData().map((book: any, index) => (
                  <Book
                    key={index}
                    handleBook={handleBook}
                    handleFavorite={handleFavorite}
                    book={book}
                    favorites={favorites}
                  />
                ))}
          </div>
        </div>

        {selectedBook && (
          <BookModal
            selectedBook={selectedBook}
            handleFavorite={handleFavorite}
            favorites={favorites}
            setSelectedBook={setSelectedBook}
          />
        )}
      </div>
    </>
  )
}

export default BooksList
