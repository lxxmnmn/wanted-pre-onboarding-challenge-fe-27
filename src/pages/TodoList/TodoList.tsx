import { useState } from 'react';
import { AddBoxRounded } from '@mui/icons-material';

import { TodoDetail } from '~components/TodoDetail';
import { useGetTodos } from '~hooks';

import './TodoList.scss';

const TodoList = () => {
  const [activeId, setActiveId] = useState<string>('');
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const { data: todos } = useGetTodos();

  const addTask = () => {
    setIsPanelOpen(true);
  };

  const toggleDetail = (id: string) => {
    setActiveId((prev) => (prev === id ? '' : id));
    setIsPanelOpen(!isPanelOpen);
  };

  const closeDetail = () => {
    setIsPanelOpen(false);
    setActiveId('');
  };

  return (
    <div className="todo">
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
              onClick={() => toggleDetail(value.id)}
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
    </div>
  );
};

export default TodoList;
