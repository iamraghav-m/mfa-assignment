
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';
import './Layout.scss';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <div className="content-area">
        <SideMenu />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
