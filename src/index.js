import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Root, Menu, Form, TenthStepBT, TenthStepGG, AboutPage, ErrorPage } from './components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Menu />,
      },
      {
        path: '/:pageNum',
        element: <Form />,
      },
      {
        path: '/bt',
        element: <TenthStepBT />,
      },
      {
        path: '/gg',
        element: <TenthStepGG />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
    ],
  },
]);

const root = document.querySelector('#root');

createRoot(root).render(<RouterProvider router={router} />);
