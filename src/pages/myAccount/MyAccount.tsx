import React from 'react';
import { useBooks } from '../../hooks/useBooks';
import MyFavourites from '../../components/account/favourites/MyFavourites';
import { useLibrary } from '../../context/hooks/useLibrary';
import { IoMdArrowBack } from 'react-icons/io';
import Button from '../../components/ui/button/Button';
import { useNavigate } from 'react-router';
import User from '../../components/account/user/User';

const MyAccount: React.FC = () => {
  const { handleBook, handleFavorite } = useBooks();

  const { libraryState } = useLibrary();

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <Button variant="ghost" onClick={() => navigate('/')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <IoMdArrowBack />
            Volver
          </div>
        </Button>
      </div>

      <h2>Mi cuenta</h2>

      <User name="test" email="test@email.com" profilePicture={null} />

      <MyFavourites />
    </div>
  );
};

export default MyAccount;
