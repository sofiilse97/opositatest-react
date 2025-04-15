import MyFavourites from '@/components/account/favourites/MyFavourites';
import User from '@/components/account/user/User';
import Button from '@/components/ui/button/Button';
import { useLibrary } from '@/context/hooks/useLibrary';
import { useBooks } from '@/hooks/useBooks';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router';

const MyAccount = () => {
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
