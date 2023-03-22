import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';

export default () => {
  return (
    <div className='main-container'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
