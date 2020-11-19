import React from 'react';
import { HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Routes from './components/Routes';

const App = () => {
  return (
    <HashRouter>
      <Navbar />
      <Routes />
    </HashRouter>
  );
};

export default App;
