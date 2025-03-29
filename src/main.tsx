
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add this console.log to check if main.tsx is executing
console.log('main.tsx is executing');

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  createRoot(rootElement).render(<App />);
  console.log('App mounted successfully');
} catch (error) {
  console.error('Error rendering the app:', error);
}
