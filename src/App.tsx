import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Toast } from '~components/Toast';
import { Account } from '~pages/Account';
import { TodoList } from '~pages/TodoList';

import './App.scss';

function App() {
  return (
    <Router>
      <Toast />
      <Routes>
        <Route path="/" element={<Navigate to={'/auth'} replace />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/auth" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
