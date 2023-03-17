import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Header, StartPage, Form, Footer } from './views';
import { ErrorPage } from './fallbacks';

export default () => (
  <RouterProvider
    router={createBrowserRouter([
      {
        path: '/',
        element: (
          <>
            <Header />
            <StartPage />
            <Footer />
          </>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/:pageNum',
        element: (
          <>
            <Header />
            <Form />
            <Footer />
          </>
        ),
        errorElement: <ErrorPage />,
      },
    ])}
  />
);
