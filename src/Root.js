import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Header, StartPage, Form, Footer, TenthStepBT } from './components';
import { ErrorPage } from './fallbacks';

export default () => (
  <RouterProvider
    router={createBrowserRouter([
      {
        path: '/',
        element: (
          <div className='main-container'>
            <Header />
            <StartPage />
            <Footer />
          </div>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/bt',
        element: (
          <div className='main-container'>
            <Header />
            <TenthStepBT />
            <Footer />
          </div>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/:pageNum',
        element: (
          <div className='main-container'>
            <Header />
            <Form />
            <Footer />
          </div>
        ),
        errorElement: <ErrorPage />,
      },
    ])}
  />
);
