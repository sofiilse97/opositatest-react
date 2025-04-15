import React, { useState, useEffect } from 'react';
import Paginator from '@/components/ui/paginator/Paginator';
import { useSearchCharacterQuery } from '@/api/queries/search/useSearchCharacterQueries';
import CharacterCard from '@/components/character/CharacterCard';
import { Character } from '@/types/character';
import SearchForm from './SearchForm/SearchForm';

import './characterList.css';
import Button from '@/components/ui/button/Button';
import List from '@/components/ui/list/List';
const CharacterList: React.FC = () => {
  const [search, setSearch] = useState({
    page: 1,
    size: 15,
    name: '',
    gender: '',
    born: '',
    died: '',
    isAlive: false,
  });

  const [showFilters, setShowFilters] = useState(false);

  const [debouncedSearch, setDebouncedSearch] = useState(search.name);

  const debouncedSearchFn = () => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.name);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  };

  useEffect(() => {
    debouncedSearchFn();
  }, [search.name]);

  const {
    data: characterQueryData,
    isLoading,
    isError,
  } = useSearchCharacterQuery({
    page: search.page,
    size: search.size,
    name: debouncedSearch,
    gender: search.gender,
    born: search.born,
    died: search.died,
    isAlive: search.isAlive,
  });

  if (isLoading) return <p>Cargando...</p>;

  if (isError) return <p style={{ color: 'red' }}>Ups</p>;

  return (
    <>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div className="body">
          <div className="search">
            <input
              type="text"
              placeholder="Buscar personaje por nombre"
              value={search.name || ''}
              onChange={(e) =>
                setSearch((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                Mostrar filtros
              </Button>
            </div>
          </div>

          {showFilters && <SearchForm search={search} setSearch={setSearch} />}

          {characterQueryData?.length === 0 && (
            <div className="result-container">
              <p>No se encontraron personajes con esa búsqueda</p>
            </div>
          )}

          {characterQueryData?.length > 0 && (
            <div className="result-container">
              <h3>
                {characterQueryData?.length || 0} personajes en esta página
              </h3>
            </div>
          )}

          <List>
            {characterQueryData?.map((character: Character) => (
              <CharacterCard key={character.url} {...character} />
            ))}
          </List>

          <Paginator
            backDisabled={search.page === 1}
            nextDisabled={characterQueryData?.length < search.size}
            setBack={() =>
              setSearch((prev) => ({ ...prev, page: prev.page - 1 }))
            }
            setNext={() =>
              setSearch((prev) => ({ ...prev, page: prev.page + 1 }))
            }
          />
        </div>
      </div>
    </>
  );
};

export default CharacterList;
