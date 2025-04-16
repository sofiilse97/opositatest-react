import Button from '@/components/ui/button/Button';
import { useState } from 'react';

import './searchForm.css';
import Select from '@/components/ui/select/Select';

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
          <Select
            label="Género"
            value={internalState.gender}
            onChange={(value) =>
              setInternalState((prev) => ({ ...prev, gender: value }))
            }
            options={[
              { value: '', label: 'Todos' },
              { value: 'female', label: 'Fememino' },
              { value: 'male', label: 'Masculino' },
            ]}
          />
        </div>
        <div className="filter-item">
          {/* Input para filtrar por año de nacimiento */}
          <label>Año de nacimiento</label>
          <input
            type="number"
            placeholder="299"
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
            placeholder="299"
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
