import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodos, getTodoById, createTodo, updateTodo } from '~services/api';
import { Todo } from '~types';

interface TodoMutationProps {
  id: string;
  param: Pick<Todo, 'title' | 'content'>;
}

export const useGetTodos = () => {
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
};

export const useGetTodoById = (id: string) => {
  return useQuery<Todo>({
    queryKey: ['todoById', id],
    queryFn: () => getTodoById(id),
    enabled: !!id,
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
    isCreatePending: mutation.isPending,
    isCreateSuccess: mutation.isSuccess,
  };
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, param }: TodoMutationProps) => updateTodo(id, param),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Failed to update todo:', error);
    },
  });

  return {
    updateTodo: mutation.mutateAsync,
    isUpdatePending: mutation.isPending,
    isUpdateSuccess: mutation.isSuccess,
  };
};
