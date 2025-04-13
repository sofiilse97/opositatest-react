import { useContext } from 'react';
import { LibraryContext } from '../LibraryContext';

export const useLibrary = () => {
  const libraryContext = useContext(LibraryContext);

  if (!libraryContext) {
    throw new Error('useCart must be used within a LibraryProvider');
  }

  return libraryContext;
};
