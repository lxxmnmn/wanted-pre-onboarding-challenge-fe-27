import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Account } from '~pages/Account';
import { TodoList } from '~pages/TodoList';

import './App.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/auth" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
