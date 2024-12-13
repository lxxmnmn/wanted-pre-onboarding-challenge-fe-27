import { Todo } from '~types';

const TodoDetail = (props: { todo: Todo }) => {
  const { title, content, updatedAt } = props.todo;

  const getDate = (dateTime: string) => dateTime.split('T')[0];

  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <p>{getDate(updatedAt)}</p>
    </div>
  );
};

export default TodoDetail;
