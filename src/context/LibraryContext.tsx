import { createContext } from 'react';
import { LibraryContextType } from '../types/library';

export const LibraryContext = createContext<LibraryContextType | undefined>(
  undefined
);
