import { Outlet } from 'react-router';
import Footer from '../components/footer/Footer';
import Header from '../components/header/header';

const MainApp = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainApp;
