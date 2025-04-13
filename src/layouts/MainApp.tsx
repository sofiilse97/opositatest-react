import { Outlet } from 'react-router';
import Footer from '../components/footer/Footer';
import Header from '../components/header/header';
import './MainApp.css';
const MainApp = () => {
  return (
    <>
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainApp;
