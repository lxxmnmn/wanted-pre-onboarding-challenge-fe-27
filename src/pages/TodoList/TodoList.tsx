import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountCircleRounded, LogoutRounded, AddBoxRounded } from '@mui/icons-material';

import { TodoDetail } from '~components/TodoDetail';
import { useGetTodos } from '~hooks';

import './TodoList.scss';

const TodoList = () => {
  const [activeId, setActiveId] = useState<string>('');
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data: todos } = useGetTodos();

  const userEmail = localStorage.getItem('email');

  const addTask = () => {
    setActiveId('');
    setIsPanelOpen(true);
  };

  const openDetail = (id: string) => {
    setActiveId(id);
    setIsPanelOpen(true);
  };

  const closeDetail = () => {
    setIsPanelOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/auth');
  };

  return (
    <div className="container">
      <header className="user">
        <p className="user__name">
          <AccountCircleRounded fontSize="small" />
          {userEmail}
        </p>
        <button type="button" className="user__logout" onClick={logout}>
          <LogoutRounded fontSize="small" />
        </button>
      </header>
      <section className="todo">
        <h1 className="todo__header">TO-DO LIST</h1>
        <ul className="todo__list">
          <li>
            <button type="button" className="todo__item--new" onClick={addTask}>
              <AddBoxRounded />할 일을 추가해 보세요.
            </button>
          </li>
          {todos?.map((value) => (
            <li key={value.id}>
              <button
                type="button"
                className={`todo__item${value.id === activeId ? '--selected' : ''}`}
                onClick={() => openDetail(value.id)}
              >
                {value.title}
              </button>
            </li>
          ))}
        </ul>
        <TodoDetail
          id={activeId}
          isVisible={isPanelOpen}
          isReadOnly={activeId !== ''}
          onClose={closeDetail}
        />
      </section>
    </div>
  );
};

export default TodoList;
