import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MockedProvider } from '@apollo/client/testing/react';
import App from './App.tsx';
import { mocks } from './mocks';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MockedProvider mocks={mocks}>
      <App />
    </MockedProvider>
  </StrictMode>
);
