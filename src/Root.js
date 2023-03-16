import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Header, StartPage, Form, Footer } from './views';
import { pageLoader } from './loaders';

const formRouter = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />,
  },
  {
    path: '/:pageNum',
    element: <Form />,
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
