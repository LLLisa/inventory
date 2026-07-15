import React, { useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
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
            <ScrollRestoration />
        </div>
    );
};
