import { useState } from 'react';
import { AddBoxRounded } from '@mui/icons-material';

import TodoDetail from '~components/TodoDetail';
import { Todo } from '~types';

import './TodoList.scss';

const data: Todo[] = [
  {
    title: 'hi1',
    content: 'hello',
    id: 'a3FGrcRL55qDCFnP4KRtn',
    createdAt: '2022-07-24T14:15:55.537Z',
    updatedAt: '2022-07-24T14:15:55.537Z',
  },
  {
    title: 'hi2',
    content: 'hello',
    id: 'z3FGrcRL55qDCFnP4KRtn',
    createdAt: '2022-07-24T14:15:55.537Z',
    updatedAt: '2022-07-25T14:15:55.537Z',
  },
];

const TodoList = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const addTask = () => {
    console.log('Add new task');
  };

  const toggleDetail = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((activeId) => activeId !== id)
        : [...prev, id]
    );
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
        {data.map((value) => (
          <li key={value.id}>
            <button
              type="button"
              className="todo__item"
              onClick={() => toggleDetail(value.id)}
            >
              {value.title}
            </button>
            {selected.includes(value.id) && <TodoDetail todo={value} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
