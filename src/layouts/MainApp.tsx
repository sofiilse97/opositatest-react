import { Outlet } from 'react-router';
import Header from '@/components/header/header';
import Footer from '@/components/footer/Footer';

import './MainApp.css';

/**
 * Componente principal de la aplicación.
 * Contiene el encabezado, el contenido principal y el pie de página.
 *
 * @returns {JSX.Element} Componente MainApp
 */
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
