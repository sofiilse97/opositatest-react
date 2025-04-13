import React from 'react';
import { useBooks } from '../../hooks/useBooks';
import MyFavourites from '../../components/account/favourites/MyFavourites';
import { useLibrary } from '../../context/hooks/useLibrary';

const MyAccount: React.FC = () => {
  const { handleBook, handleFavorite } = useBooks();

  const { libraryState } = useLibrary();

  return (
    <div>
      <h1>My Account</h1>
      <MyFavourites />
    </div>
  );
};

export default MyAccount;
