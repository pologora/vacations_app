import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ContextGlobalWrapper } from './components/ContextGlobalWrapper/ContextGlobalWrapper.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextGlobalWrapper>
      <App />
    </ContextGlobalWrapper>
  </React.StrictMode>
);
