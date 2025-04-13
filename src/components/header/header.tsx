import React from 'react';
import './Header.css';
import logo from '../../resources/logo.png';
import { MdAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <a href="/">
        <img src={logo} alt="Logo" className="logo" />
      </a>

      <MdAccountCircle size={37} onClick={() => navigate('/myAccount')} />
    </div>
  );
};

export default Header;
