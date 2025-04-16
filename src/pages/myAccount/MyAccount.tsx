import MyFavourites from '@/components/account/favourites/MyFavourites';
import User from '@/components/account/user/User';
import Button from '@/components/ui/button/Button';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router';

import './myAccount.css';

const MyAccount = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <Button variant="ghost" onClick={() => navigate('/')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <IoMdArrowBack />
            Volver a la libería
          </div>
        </Button>
      </div>

      <h2>Mi cuenta</h2>

      <User name="test" email="test@email.com" profilePicture={null} />

      <div className="separator"></div>

      <MyFavourites />
    </div>
  );
};

export default MyAccount;
