import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { Button } from 'semantic-ui-react';

import './App.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';
import Home from './components/home';
import View from './components/view';

export default function App() {
  return (
    <Router>
      <div className="header">
        <h1>MyProject</h1>

        <div className="menu">
          <Link to="/">
            <Button>Home</Button>
          </Link>
          <Link to="/Create">
            <Button>Create</Button>
          </Link>
          <Link to="/Read">
            <Button>Read</Button>
          </Link>
        </div>
      </div>
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/read" element={<Read />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </div>
    </Router>
  );
}
