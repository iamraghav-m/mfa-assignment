import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Components/Dashboard';

const App: React.FC = () => (
  <React.StrictMode>
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  </React.StrictMode>
);

export default App;