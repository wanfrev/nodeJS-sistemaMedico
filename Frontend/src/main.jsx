import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MedicalApp } from './MedicalApp';
import { AuthProvider } from './auth/context/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <MedicalApp />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);