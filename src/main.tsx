/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { I18nProvider } from './contexts/I18nContext';
import { useThemeSettings } from './hooks/useThemeSettings';

const ThemeBootstrap = ({ children }: { children: React.ReactNode }) => {
  useThemeSettings();
  return <>{children}</>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <ThemeBootstrap>
          <App />
        </ThemeBootstrap>
      </I18nProvider>
    </BrowserRouter>
  </React.StrictMode>
);
