import { useQuery } from '@tanstack/react-query';
import { getTodos } from '~services/api';
import { Todo } from '~types';

export const useTodos = () => {
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
};
