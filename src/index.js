// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const renderApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    // <React.StrictMode>
      <App />
    // </React.StrictMode>
  );
};

if (process.env.NODE_ENV === 'development') {
  import('./mocks/browser').then(({ worker }) => {
    worker.start().then(() => {
      renderApp(); // Só renderiza depois que o MSW estiver pronto
    });
  });
} else {
  renderApp();
}

reportWebVitals();
