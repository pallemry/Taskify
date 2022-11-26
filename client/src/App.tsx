import React, { } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter } from 'react-router-dom';
import AnimatedRoutes from './components/AnimatedRoutes/AnimatedRoutes';
import UserProvider from './components/User/UserProvider';

const App: React.FC = () => {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <NavBar />
          <AnimatedRoutes />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
