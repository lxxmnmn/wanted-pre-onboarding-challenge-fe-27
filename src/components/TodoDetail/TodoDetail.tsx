// import { useState, useEffect } from 'react';
import { CloseRounded } from '@mui/icons-material';

import { Todo } from '~types';

import './TodoDetail.scss';

interface TodoDetailProps {
  todo: Todo;
  isVisible: boolean;
  onClose: () => void;
}

const TodoDetail = (props: TodoDetailProps) => {
  const { title, content, updatedAt } = props.todo;

  const formatDate = (updatedAt: string) => {
    const date = new Date(updatedAt);
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  };

  // useEffect(() => {
  //   if (id) setIsOpen(true);
  //   else setIsOpen(false);
  // }, []);

  return (
    <>
      {props.isVisible && (
        <div className="panel-backdrop" onClick={props.onClose}></div>
      )}
      <div className={`detail ${props.isVisible ? 'visible' : 'hidden'}`}>
        <header>
          <button
            type="button"
            className="detail__close"
            onClick={props.onClose}
          >
            <CloseRounded />
          </button>
        </header>
        <article>
          <h2 className="detail__title">{title}</h2>
          <p className="detail__content">{content}</p>
        </article>
        <footer>
          <span className="detail__updated-at">{formatDate(updatedAt)}</span>
        </footer>
      </div>
    </>
  );
};

export default TodoDetail;
