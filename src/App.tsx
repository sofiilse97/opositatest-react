import BooksList from './pages/booksList/BooksList';
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import LibraryProvider from './context/LibraryProvider';
import MyAccount from './pages/myAccount/MyAccount';
import MainApp from './layouts/MainApp';
import ErrorBoundary from './components/ui/error/ErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

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
