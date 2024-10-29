import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Auth from './pages/Auth';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
