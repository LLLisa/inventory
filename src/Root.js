import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Header, StartPage, Form, Footer } from './views';
import { ErrorPage } from './fallbacks';
import { pageLoader } from './loaders';

const formRouter = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/:pageNum',
    element: <Form />,
    errorElement: <ErrorPage />,
    loader: pageLoader,
  },
]);

export default function () {
  return (
    <>
      <Header />
      <RouterProvider router={formRouter} />
      <Footer />
    </>
  );
}
