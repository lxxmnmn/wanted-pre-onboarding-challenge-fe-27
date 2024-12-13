import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Auth from '~pages/Auth';
import { TodoList } from '~pages/TodoList';

import './App.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
