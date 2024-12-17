import { CloseRounded } from '@mui/icons-material';

import { Todo } from '~types';

import './TodoDetail.scss';

interface TodoDetailProps {
  todo: Todo;
  isVisible: boolean;
  isReadOnly: boolean;
  onClose: () => void;
}

const TodoDetail = (props: TodoDetailProps) => {
  const { title, content, updatedAt } = props.todo;

  const formatDate = (updatedAt: string) => {
    const date = new Date(updatedAt);
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <>
      {props.isVisible && (
        <div className="panel-backdrop" onClick={props.onClose}></div>
      )}
      <div className={`detail${props.isVisible ? '' : '--hidden'}`}>
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
          {props.isReadOnly ? (
            <>
              <h2 className="detail__title">{title}</h2>
              <p className="detail__content">{content}</p>
            </>
          ) : (
            <>
              <input type="text" className="detail__title" />
              <textarea className="detail__content" />
            </>
          )}
        </article>
        <footer>
          {props.isReadOnly && (
            <span className="detail__updated-at">{formatDate(updatedAt)}</span>
          )}
        </footer>
      </div>
    </>
  );
};

export default TodoDetail;
