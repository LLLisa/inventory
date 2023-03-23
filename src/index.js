import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Root, Menu, Form, TenthStepBT, TenthStepGG, AboutPage, ErrorPage } from './components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Menu />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/:pageNum',
        element: <Form />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/bt',
        element: <TenthStepBT />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/gg',
        element: <TenthStepGG />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const root = document.querySelector('#root');

createRoot(root).render(<RouterProvider router={router} />);
