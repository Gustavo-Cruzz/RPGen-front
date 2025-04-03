import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement as HTMLElement); // Ensure proper type assertion
    root.render(
        React.createElement(
            React.StrictMode,
            null,
            React.createElement(App, null)
        )
    );
} else {
    console.error('Root element not found');
}