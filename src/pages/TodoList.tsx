import { useState } from 'react';
import TodoDetail from '../components/TodoDetail';
import { Todo } from '../types';

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

  const toggleDetail = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((activeId) => activeId !== id)
        : [...prev, id]
    );
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {data.map((value) => (
          <li key={value.id}>
            <button type="button" onClick={() => toggleDetail(value.id)}>
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
