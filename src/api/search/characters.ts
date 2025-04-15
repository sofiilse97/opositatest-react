import { API_BASE_URL } from '../constants/constants';

export const searchCharacters = async ({
  page = 1,
  size = 20,
  name,
  gender,
  born,
  died,
  isAlive,
}: {
  page?: number | undefined;
  size?: number | undefined;
  name?: string | undefined;
  gender?: string | undefined;
  born?: string | undefined;
  died?: string | undefined;
  isAlive?: boolean | undefined;
} = {}) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('pageSize', size.toString());

  if (name) params.append('name', name);
  if (gender) params.append('gender', gender);
  if (born) params.append('born', born);
  if (died) params.append('died', died);
  if (isAlive !== undefined) params.append('isAlive', isAlive.toString());

  const url = `${API_BASE_URL}/api/characters?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error al buscar personajes');
  }
  return response.json();
};
