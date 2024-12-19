import { useEffect, useState, ChangeEvent } from 'react';
import { CircularProgress } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

import { useGetTodoById, useCreateTodo } from '~hooks';
import { Todo } from '~types';

import './TodoDetail.scss';

interface TodoDetailProps {
  id: string;
  isVisible: boolean;
  isReadOnly: boolean;
  onClose: () => void;
}

const defaultTodo = {
  title: '',
  content: '',
  id: '',
  createdAt: '',
  updatedAt: '',
};

const TodoDetail = ({ id, isVisible, isReadOnly, onClose }: TodoDetailProps) => {
  const [todo, setTodo] = useState<Todo>(defaultTodo);
  const { data: savedTodo } = useGetTodoById(id, isReadOnly);
  const { createTodo, isPending, isSuccess } = useCreateTodo();

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      title: event.target.value,
    }));
  };

  const changeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      content: event.target.value,
    }));
  };

  const saveTodo = () => {
    createTodo({
      title: todo.title,
      content: todo.content,
    });
  };

  const formatDate = (updatedAt: string) => {
    const date = new Date(updatedAt);
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  };

  useEffect(() => {
    if (savedTodo) setTodo(savedTodo);
    else setTodo(defaultTodo);
  }, [savedTodo]);

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  return (
    <>
      {isVisible && <div className="panel-backdrop" onClick={onClose}></div>}
      <div className={`detail${isVisible ? '' : '--hidden'}`}>
        <header>
          <button type="button" className="detail__close" onClick={onClose}>
            <CloseRounded />
          </button>
        </header>
        {isReadOnly ? (
          <>
            <article>
              <h2 className="detail__title">{todo.title}</h2>
              <p className="detail__content">{todo.content}</p>
            </article>
            <footer>
              <span className="detail__updated-at">{formatDate(todo.updatedAt)}</span>
            </footer>
          </>
        ) : (
          <>
            <article>
              <input
                type="text"
                className="detail__title"
                placeholder="TO-DO"
                onChange={changeTitle}
              />
              <textarea className="detail__content" onChange={changeContent} />
            </article>
            <footer>
              <div className="detail__button-box">
                <button type="button" className="detail__cancel" onClick={onClose}>
                  취소
                </button>
                <button
                  type="button"
                  className="detail__save"
                  disabled={!todo.title.length || !todo.content.length}
                  onClick={saveTodo}
                >
                  {isPending ? <CircularProgress color="inherit" /> : <>저장</>}
                </button>
              </div>
            </footer>
          </>
        )}
      </div>
    </>
  );
};

export default TodoDetail;
