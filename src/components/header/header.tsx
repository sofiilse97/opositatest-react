import React from 'react';
import logo from '@/resources/logo.png';
import { MdAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router';

import './header.css';
import Button from '../ui/button/Button';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header-left">
        <a href="/">
          <img src={logo} alt="Logo" className="logo" />
        </a>
        <Button variant="ghost" onClick={() => navigate('/')}>
          Librería
        </Button>
        <Button variant="ghost" onClick={() => navigate('/characters')}>
          Personajes
        </Button>
      </div>

      <div>
        <MdAccountCircle
          className="account-icon"
          size={37}
          onClick={() => navigate('/myAccount')}
        />
      </div>
    </div>
  );
};

export default Header;
