import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CardList from './components/CardList';
import CardDetails from './components/CardDetails';
import FilterButton from './components/FilterButton';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Dog Cards</h1>
          <FilterButton />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<CardList />} />
            <Route path="/card/:id" element={<CardDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
