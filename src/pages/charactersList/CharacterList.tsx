import { useState, useEffect } from 'react';
import Paginator from '@/components/ui/paginator/Paginator';
import { useSearchCharacterQuery } from '@/api/queries/search/useSearchCharacterQueries';
import CharacterCard from '@/components/character/CharacterCard';
import { Character } from '@/types/character';
import SearchForm from './SearchForm/SearchForm';
import Button from '@/components/ui/button/Button';
import List from '@/components/ui/list/List';
import { CharacterSearchParams } from '@/api/queries/types/character';

import './characterList.css';
const CharacterList = () => {
  const [search, setSearch] = useState<CharacterSearchParams>({
    page: 1,
    size: 15,
    name: '',
    gender: '',
    born: '',
    died: '',
  });

  const [showFilters, setShowFilters] = useState(false);

  const [debouncedSearch, setDebouncedSearch] = useState(search.name);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch((prev) => ({ ...prev, page: 1 }));
      setDebouncedSearch(search.name);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
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
                {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
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

          {characterQueryData?.length > 0 && (
            <Paginator
              backDisabled={search.page === 1}
              nextDisabled={characterQueryData?.length < search?.size}
              setBack={() => {
                setSearch((prev) => ({ ...prev, page: prev?.page - 1 }));
                setShowFilters(false);
              }}
              setNext={() => {
                setSearch((prev) => ({ ...prev, page: prev?.page + 1 }));
                setShowFilters(false);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CharacterList;
