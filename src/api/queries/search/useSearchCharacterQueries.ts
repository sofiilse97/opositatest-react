import { searchCharacters } from '@/api/search/characters';
import { useQuery } from '@tanstack/react-query';
import { CharacterSearchParams } from '../types/character';

export const SEARCH_CHARACTER_QUERY_KEY = 'searchCharacter';

export const useSearchCharacterQuery = ({
  page = 1,
  size = 20,
  name = '',
  gender = '',
  born = '',
  died = '',
}: CharacterSearchParams = {}) =>
  useQuery({
    queryKey: [
      SEARCH_CHARACTER_QUERY_KEY,
      page,
      size,
      name,
      gender,
      born,
      died,
    ],
    queryFn: () => searchCharacters({ page, size, name, gender, born, died }),
  });
