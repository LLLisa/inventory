import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from './Root';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { StartPage, Form, TenthStepBT } from './components';
import { ErrorPage } from './fallbacks';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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

const root = document.querySelector('#root');

createRoot(root).render(<RouterProvider router={router} />);
