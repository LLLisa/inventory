import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Main, StartPage, Form, TenthStepBT } from './components';
import { ErrorPage } from './fallbacks';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <StartPage />,
      },
      {
        path: '/:pageNum',
        element: <Form />,
      },
      {
        path: '/bt',
        element: <TenthStepBT />,
      },
    ],
  },
]);

export default () => <RouterProvider router={router} />;
