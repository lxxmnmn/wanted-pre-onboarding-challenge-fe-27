import { useState, useMemo } from 'react';
import { AddBoxRounded } from '@mui/icons-material';

import { TodoDetail } from '~components/TodoDetail';
import { useTodos } from '~hooks';
import { Todo } from '~types';

import './TodoList.scss';

const TodoList = () => {
  const [activeId, setActiveId] = useState<string>('');
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const { data: todos } = useTodos();

  const selectedTodo = useMemo(() => {
    return todos?.find((value) => value.id === activeId) || ({} as Todo);
  }, [activeId]);

  const addTask = () => {
    const uniqueId = crypto.randomUUID();

    setIsReadOnly(false);
    setActiveId(uniqueId);
  };

  const toggleDetail = (id: string) => {
    setIsReadOnly(true);
    setActiveId((prev) => (prev === id ? '' : id));
  };

  const closeDetail = () => {
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
        todo={selectedTodo}
        isVisible={activeId !== ''}
        isReadOnly={isReadOnly}
        onClose={closeDetail}
      />
    </div>
  );
};

export default TodoList;
