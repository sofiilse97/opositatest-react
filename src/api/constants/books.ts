import { API_BASE_URL, API_COVER_BOOKS } from './constants';

export const searchBooks = async () => {
  return await fetch(`${API_BASE_URL}/api/books`);
};

export const searchBook = async (url: string) => {
  return await fetch(url);
};

export const getCoverFile = ({ isbn }: { isbn: string }) => {
  return `${API_COVER_BOOKS}/b/isbn/${isbn}-M.jpg`;
};
