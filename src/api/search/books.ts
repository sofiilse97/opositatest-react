import { API_BASE_URL, API_COVER_BOOKS } from '../constants/constants';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const searchBooks = async ({
  page = 1,
  size = 10,
  searchQuery = '',
}: {
  page?: number | undefined;
  size?: number | undefined;
  searchQuery?: string | undefined;
} = {}) => {
  await delay(1000);

  const response = await fetch(
    `${API_BASE_URL}/api/books?page=${page}&pageSize=${size}`
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
