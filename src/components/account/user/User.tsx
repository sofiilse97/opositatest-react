import { useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';

interface UserProps {
  name: string;
  email: string;
  profilePicture: string | null;
}

/**
 * Componente que representa la información del usuario.
 * Muestra el nombre, correo electrónico y una imagen de perfil.
 * @param {UserProps} props - Propiedades del usuario.
 * @returns {JSX.Element} Componente User
 */
const User = ({ name, email, profilePicture }: UserProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {profilePicture && !imageError ? (
        <img
          src={profilePicture}
          alt={`${name}'s profile`}
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          onError={(e) => {
            setImageError(true);
          }}
        />
      ) : (
        <MdAccountCircle size={50} />
      )}
      <div>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{name}</p>
        <p style={{ margin: 0 }}>{email}</p>
      </div>
    </div>
  );
};

export default User;
