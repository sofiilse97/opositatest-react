import { API_BASE_URL } from '../constants/constants';
import { CharacterSearchParams } from '../queries/types/character';

export const searchCharacters = async ({
  page = 1,
  size = 20,
  name,
  gender,
  born,
  died,
}: CharacterSearchParams = {}) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('pageSize', size.toString());

  if (name) params.append('name', name);
  if (gender) params.append('gender', gender);
  if (born) {
    // necesitamos añadir In {año} AC para que funcione, ya que es necesario el formato entero
    params.append('born', `In ${born} AC`);
  }
  if (died) {
    // necesitamos añadir In {año} AC para que funcione, ya que es necesario el formato entero
    params.append('died', `In ${died} AC`);
  }

  const url = `${API_BASE_URL}/api/characters?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error al buscar personajes');
  }
  return response.json();
};
