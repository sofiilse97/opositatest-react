import BooksList from './pages/booksList/BooksList';
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import LibraryProvider from './context/LibraryProvider';
import MyAccount from './pages/myAccount/MyAccount';
import MainApp from './layouts/MainApp';
import ErrorBoundary from './components/ui/error/ErrorBoundary';

const App = () => {
  return (
    <>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </>
  );
};

export default App;
