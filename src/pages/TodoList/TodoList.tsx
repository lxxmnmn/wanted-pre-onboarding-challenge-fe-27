import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AccountCircleRounded,
  LogoutRounded,
  AddBoxRounded,
  EditRounded,
  DeleteForeverRounded,
} from '@mui/icons-material';

import { TodoDetail } from '~components/TodoDetail';
import { useGetTodos } from '~hooks';
import { TodoState } from '~types';

import './TodoList.scss';

const TodoList = () => {
  const [todoState, setTodoState] = useState<TodoState>({
    activeId: '',
    isReadOnly: false,
    showDetail: false,
  });
  const navigate = useNavigate();
  const { data: todos } = useGetTodos();

  const userEmail = localStorage.getItem('email');

  const addTodo = () => {
    setTodoState({
      activeId: '',
      isReadOnly: false,
      showDetail: true,
    });
  };

  const editTodo = (id: string) => {
    setTodoState({
      activeId: id,
      isReadOnly: false,
      showDetail: true,
    });
  };

  const openDetail = (id: string) => {
    setTodoState({
      activeId: id,
      isReadOnly: true,
      showDetail: true,
    });
  };

  const closeDetail = () => {
    setTodoState((prev) => ({ ...prev, showDetail: false }));
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
          <li className="todo__item--new">
            <button type="button" onClick={addTodo}>
              <AddBoxRounded />할 일을 추가해 보세요.
            </button>
          </li>
          {todos?.map((value) => (
            <li
              className={`todo__item${todoState.showDetail && todoState.activeId === value.id ? '--selected' : ''}`}
              key={value.id}
            >
              <button type="button" onClick={() => openDetail(value.id)}>
                {value.title}
              </button>
              <div className="todo__button-box">
                <button type="button" onClick={() => editTodo(value.id)}>
                  <EditRounded />
                </button>
                <button type="button">
                  <DeleteForeverRounded />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <TodoDetail state={todoState} onClose={closeDetail} />
      </section>
    </div>
  );
};

export default TodoList;
