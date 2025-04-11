import BooksList from './pages/booksList/BooksList';
import Header from './components/header/header';
import Footer from './components/footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router';
import BookData from './pages/bookData/BookData';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<BooksList />} />
          <Route path="/book/:url" index element={<BookData />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
