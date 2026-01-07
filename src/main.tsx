import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { StyleSheetManager } from 'styled-components';
import './index.css';

const styleTarget = typeof document !== 'undefined' ? document.head : undefined;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleSheetManager disableCSSOMInjection target={styleTarget as any}>
      <App />
    </StyleSheetManager>
  </StrictMode>
);
