import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LibraryProvider from '@/context/LibraryProvider';

const renderWithProvider = (ui: React.ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <LibraryProvider>{ui}</LibraryProvider>
    </QueryClientProvider>
  );
};

export { renderWithProvider };
