import { MdAccountCircle } from 'react-icons/md';
import './characterCard.css';
import { Character } from '@/types/character';

const CharacterCard = ({
  name,
  gender,
  culture,
  born,
  died,
  titles,
  aliases = [],
  playedBy,
  ...props
}: Character) => {
  return (
    <div className="character-card">
      <div className="character-image">
        <MdAccountCircle className="account-icon" size={50} />
      </div>
      <h2 className="character-name">{!!name ? name : aliases[0]}</h2>
      <p className="character-detail">
        <strong>Alias:</strong>{' '}
        {aliases.length > 0 ? aliases.join(', ') : 'Desconocido'}
      </p>
      <p className="character-detail">
        <strong>Género:</strong> {gender}
      </p>
      <p className="character-detail">
        <strong>Cultura:</strong> {culture || 'Desconocido'}
      </p>
      <p className="character-detail">
        <strong>Nacimiento:</strong> {born || 'Desconocido'}
      </p>
      <p className="character-detail">
        <strong>Muerte:</strong> {died || 'N/A'}
      </p>
      <p className="character-detail">
        <strong>Título:</strong>{' '}
        {titles.length > 0 ? titles.join(', ') : 'Sin título'}
      </p>

      <p className="character-detail">
        <strong>Interpetrado por:</strong>{' '}
        {playedBy.length > 0 ? playedBy.join(', ') : 'Desconocido'}
      </p>
    </div>
  );
};

export default CharacterCard;
