import React from 'react';
import './Header.css';
import logo from '../../resources/logo.png';

const Header: React.FC = () => {
  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo" />
    </div>
  );
};

export default Header;
