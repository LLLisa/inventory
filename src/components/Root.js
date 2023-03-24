import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '.';

export default () => {
  useEffect(() => {
    window.addEventListener('beforeunload', alertUser);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  return (
    <div className='main-container'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
