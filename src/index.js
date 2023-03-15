import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Loading from './Loading';

// const router = createBrowserRouter([]);

const root = document.querySelector('#root');

createRoot(root).render(<Root />);
