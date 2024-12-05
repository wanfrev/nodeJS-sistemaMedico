import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MedicalApp } from './MedicalApp';
import { AuthProvider } from './auth/context/AuthContext';

import './index.css';

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


// Example of an API call to the backend
fetch('http://localhost:3000/api/test')
  .then(response => response.json())
  .then(data => console.log('Backend response:', data))
  .catch(error => console.error('Error connecting to backend:', error));