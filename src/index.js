import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import Root from './Root';

const queryClient = new QueryClient();

const root = document.querySelector('#root');

createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <Root />
  </QueryClientProvider>
);
