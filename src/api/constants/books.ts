import { API_BASE_URL, API_COVER_BOOKS } from './constants';

export const searchBooks = async ({
  page = 1,
  size = 10,
  searchQuery = '',
}: {
  page?: number | undefined;
  size?: number | undefined;
  searchQuery?: string | undefined;
} = {}) => {
  const response = await fetch(
    `${API_BASE_URL}/api/books?page=${page}&size=${size}`
  );

  if (!response.ok) {
    throw new Error('Error al buscar libros');
  }
  return response.json();
};

export const searchBook = async (url: string) => {
  return await fetch(url);
};

export const getCoverFile = ({ isbn }: { isbn: string }) => {
  return `${API_COVER_BOOKS}/b/isbn/${isbn}-M.jpg`;
};
