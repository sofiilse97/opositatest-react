import React from 'react'
import BooksList from './pages/booksList/books-list'
import Header from './components/header/header'
import Footer from './components/footer/Footer'

const App = () => {
  return (
    <>
      <Header />
      <BooksList />
      <Footer />
    </>
  )
}

export default App
