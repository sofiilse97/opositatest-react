export const SEARCH_BOOK_QUERY_KEY = 'searchBookQueryKey';
import { useQuery } from '@tanstack/react-query';
import { searchBooks } from '../../constants/books';

export const useSearchBookQuery = ({
  page = 1,
  size = 10,
  searchQuery = '',
}: {
  page?: number | undefined;
  size?: number | undefined;
  searchQuery?: string | undefined;
} = {}) =>
  useQuery({
    queryKey: [SEARCH_BOOK_QUERY_KEY, page, size, searchQuery],
    queryFn: () => searchBooks({ page, size, searchQuery }),
  });
