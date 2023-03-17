import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from './Root';

const root = document.querySelector('#root');

createRoot(root).render(<Root />);
