import Button from '@/components/ui/button/Button';
import { useState } from 'react';

import './searchForm.css';

const SearchForm = ({
  search,
  setSearch,
}: {
  search: {
    page: number;
    size: number;
    name: string;
    gender: string;
    born: string;
    died: string;
    isAlive: boolean;
  };
  setSearch: React.Dispatch<
    React.SetStateAction<{
      page: number;
      size: number;
      name: string;
      gender: string;
      born: string;
      died: string;
      isAlive: boolean;
    }>
  >;
}) => {
  const [internalState, setInternalState] = useState(search);

  return (
    <div className="filters-container">
      <div>
        <h4>Filtrar búsqueda</h4>
        <p>Filtra los personajes por nombre y otros criterios</p>
      </div>
      <div className="filters">
        {/* Select para filtrar por género */}
        <label>
          Género:
          <select
            value={internalState.gender}
            onChange={(e) =>
              setInternalState((prev) => ({ ...prev, gender: e.target.value }))
            }
          >
            <option value="">Todos</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
            <option value="unknown">Desconocido</option>
          </select>
        </label>
        {/* Input para filtrar por año de nacimiento */}
        <label>
          Año de nacimiento:
          <input
            type="number"
            placeholder="Año de nacimiento"
            value={internalState.born || ''}
            onChange={(e) =>
              setInternalState((prev) => ({ ...prev, born: e.target.value }))
            }
          />
        </label>
        {/* Input para filtrar por año de muerte */}
        <label>
          Año de muerte:
          <input
            type="number"
            placeholder="Año de muerte"
            value={internalState.died || ''}
            onChange={(e) =>
              setInternalState((prev) => ({ ...prev, died: e.target.value }))
            }
          />
        </label>
        {/* Checkbox para filtrar por "Sigue vivo"
      <label>
        <input
          type="checkbox"
          checked={internalState.isAlive}
          onChange={(e) =>
            setInternalState((prev) => ({ ...prev, isAlive: e.target.checked }))
          }
        />
        Sigue vivo
      </label> */}
      </div>
      <div className="filters-buttons">
        <Button
          variant="outline"
          onClick={() => setSearch((prev) => ({ ...prev, ...internalState }))}
        >
          Limpiar filtros
        </Button>
        <Button
          onClick={() => setSearch((prev) => ({ ...prev, ...internalState }))}
        >
          Aplicar filtros
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
