import { MdAccountCircle } from 'react-icons/md';

interface UserProps {
  name: string;
  email: string;
  profilePicture: string | null;
}

const User = ({ name, email, profilePicture }: UserProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {profilePicture ? (
        <img
          src={profilePicture}
          alt={`${name}'s profile`}
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          onError={(e) => {
            e.target.src = 'https://avatar.iran.liara.run/public';
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
