import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodos, getTodoById, createTodo } from '~services/api';
import { Todo } from '~types';

export const useGetTodos = () => {
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
};

export const useGetTodoById = (id: string, isReadOnly: boolean) => {
  return useQuery<Todo>({
    queryKey: ['todoById', id],
    queryFn: () => getTodoById(id),
    enabled: !!id && isReadOnly,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Pick<Todo, 'title' | 'content'>) => createTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Failed to create todo:', error);
    },
  });

  return {
    createTodo: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
};
