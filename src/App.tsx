import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ErrorBoundary from './components/ui/error/ErrorBoundary';
import LibraryProvider from './context/LibraryProvider';
import MainApp from './layouts/MainApp';
import BooksList from './pages/booksList/BooksList';
import MyAccount from './pages/myAccount/MyAccount';
import CharacterList from './pages/charactersList/CharacterList';
import './App.css';

// Create a client
const queryClient = new QueryClient();

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

const App = () => {
  const [showDevtools, setShowDevtools] = React.useState(false);

  React.useEffect(() => {
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <LibraryProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<MainApp />}>
                  <Route index element={<BooksList />} />
                  <Route path="/characters" element={<CharacterList />} />
                  <Route path="/myAccount" element={<MyAccount />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </LibraryProvider>
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
        {showDevtools && (
          <React.Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
          </React.Suspense>
        )}
      </QueryClientProvider>
    </>
  );
};

export default App;
