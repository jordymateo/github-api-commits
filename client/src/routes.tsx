import React from 'react';
import { Routes as Router, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages';
import './static/styles/global.scss';

const Routes = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<HomePage />} />
      </Router>
    </BrowserRouter>
  );
}

export default Routes;