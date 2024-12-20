import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AccountCircleRounded,
  LogoutRounded,
  AddBoxRounded,
  EditRounded,
  DeleteForeverRounded,
} from '@mui/icons-material';

import { TodoDetail } from '~components/TodoDetail';
import { TOAST } from '~constants';
import { useGetTodos, useDeleteTodo } from '~hooks';
import { setLogout, isTokenExpired, getEmail } from '~services/auth';
import { useToastStore } from '~stores';
import { TodoState } from '~types';

import './TodoList.scss';

const TodoList = () => {
  const [todoState, setTodoState] = useState<TodoState>({
    activeId: '',
    isReadOnly: false,
    showDetail: false,
  });
  const navigate = useNavigate();
  const { setMessage } = useToastStore();

  const { data: todos } = useGetTodos();
  const { deleteTodo } = useDeleteTodo();

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

  const removeTodo = (id: string) => {
    deleteTodo(id);
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

  useEffect(() => {
    if (isTokenExpired()) {
      setMessage(TOAST.ERROR, '토큰이 유효하지 않아요.');
      navigate('/auth');
    }
  }, []);

  return (
    <div className="container">
      <header className="user">
        <p className="user__name">
          <AccountCircleRounded fontSize="small" />
          {getEmail()}
        </p>
        <button type="button" className="user__logout" onClick={() => setLogout}>
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
                <button type="button" onClick={() => removeTodo(value.id)}>
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
