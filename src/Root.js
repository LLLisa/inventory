import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Header, StartPage, Form, Footer } from './views';

const formRouter = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />,
  },
  {
    path: '/:pageNum',
    element: <Form />,
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
