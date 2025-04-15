import { Outlet } from 'react-router';
import Header from '@/components/header/header';
import Footer from '@/components/footer/Footer';

import './MainApp.css';
const MainApp = () => {
  return (
    <>
      <Header />
      <div className="main-content">
        <div className="body">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainApp;
