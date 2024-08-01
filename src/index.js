import React from 'react';
import { createRoot } from 'react-dom/client';
import ProtectedApp from './ProtectedApp';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/latet-lalev">
      <ProtectedApp />
    </BrowserRouter>
  </React.StrictMode>
);
