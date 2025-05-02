import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/game" />} />
        <Route path="/game" element={<GameBoard />} />
        <Route path="/scores" element={<ScoreBoard />} />
      </Routes>
    </Router>
  );
};

export default App;