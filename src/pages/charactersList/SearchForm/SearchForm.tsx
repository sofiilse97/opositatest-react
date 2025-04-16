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
    isAlive?: boolean;
  };
  setSearch: React.Dispatch<
    React.SetStateAction<{
      page: number;
      size: number;
      name: string;
      gender: string;
      born: string;
      died: string;
      isAlive?: boolean;
    }>
  >;
}) => {
  const [internalState, setInternalState] = useState(search);

  const handleCleanFilters = () => {
    setInternalState({
      page: 1,
      size: 15,
      name: '',
      gender: '',
      born: '',
      died: '',
    });
    setSearch((prev) => ({
      ...prev,
      page: 1,
      size: 15,
      name: '',
      gender: '',
      born: '',
      died: '',
    }));
  };

  const handleApplyFilters = () => {
    setSearch((prev) => ({ ...prev, ...internalState }));
  };

  return (
    <div className="filters-container">
      <div>
        <h4>Filtrar búsqueda</h4>
      </div>
      <div className="filters">
        {/* Select para filtrar por género */}
        <div className="filter-item">
          <label>Género</label>
          <select
            value={internalState.gender}
            onChange={(e) =>
              setInternalState((prev) => ({ ...prev, gender: e.target.value }))
            }
          >
            <option value="">Todos</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
          </select>
        </div>
        <div className="filter-item">
          {/* Input para filtrar por año de nacimiento */}
          <label>Año de nacimiento</label>
          <input
            type="number"
            placeholder="Año de nacimiento"
            value={internalState.born || ''}
            onChange={(e) =>
              setInternalState((prev) => ({ ...prev, born: e.target.value }))
            }
          />
        </div>
        <div className="filter-item">
          {/* Input para filtrar por año de muerte */}
          <label>Año de muerte</label>
          <input
            type="number"
            placeholder="Año de muerte"
            value={internalState.died || ''}
            onChange={(e) =>
              setInternalState((prev) => ({ ...prev, died: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="filters-buttons">
        <Button variant="outline" onClick={handleCleanFilters}>
          Limpiar filtros
        </Button>
        <Button onClick={handleApplyFilters}>Aplicar filtros</Button>
      </div>
    </div>
  );
};

export default SearchForm;
