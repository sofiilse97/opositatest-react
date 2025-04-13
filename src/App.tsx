import BooksList from './pages/booksList/BooksList';
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import LibraryProvider from './context/LibraryProvider';
import MyAccount from './pages/myAccount/MyAccount';
import MainApp from './layouts/MainApp';

const App = () => {
  return (
    <>
      <LibraryProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainApp />}>
              <Route index element={<BooksList />} />
              <Route path="/myAccount" element={<MyAccount />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LibraryProvider>
    </>
  );
};

export default App;
