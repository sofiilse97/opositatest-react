import React from 'react';
import { useBooks } from '../../hooks/useBooks';
import MyFavourites from '../../components/account/favourites/MyFavourites';

const MyAccount: React.FC = () => {
  const { handleBook, handleFavorite, favorites } = useBooks();

  return (
    <div>
      <h1>My Account</h1>
      <MyFavourites />
    </div>
  );
};

export default MyAccount;
