import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Header, StartPage, Form, Footer } from './views';
import { ErrorPage } from './fallbacks';
import { pageLoader } from './loaders';

const formRouter = createBrowserRouter([
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
    loader: pageLoader,
  },
]);

export default function () {
  return (
    <>
      {/* <Header /> */}
      <RouterProvider router={formRouter} />
      {/* <Footer /> */}
    </>
  );
}
