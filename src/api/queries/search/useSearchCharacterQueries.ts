import { searchCharacters } from '@/api/search/characters';
import { useQuery } from '@tanstack/react-query';

export const SEARCH_CHARACTER_QUERY_KEY = 'searchCharacter';

export const useSearchCharacterQuery = ({
  page = 1,
  size = 20,
  name = '',
  gender = '',
  born = '',
  died = '',
  isAlive = false,
}: {
  page?: number | undefined;
  size?: number | undefined;
  name?: string | undefined;
  gender?: string | undefined;
  born?: string | undefined;
  died?: string | undefined;
  isAlive?: boolean | undefined;
} = {}) =>
  useQuery({
    queryKey: [
      SEARCH_CHARACTER_QUERY_KEY,
      page,
      size,
      name,
      gender,
      born,
      died,
      isAlive,
    ],
    queryFn: () =>
      searchCharacters({ page, size, name, gender, born, died, isAlive }),
  });
