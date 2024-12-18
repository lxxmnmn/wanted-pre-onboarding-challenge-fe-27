import axios from 'axios';
import { AuthResponse, DataResponse, User, Todo } from '~types';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

const config = {
  headers: {
    Authorization: localStorage.getItem('token'),
  },
};

export const signUp = async (param: User): Promise<AuthResponse> => {
  const response = await apiClient.post('/users/create', param);
  return response.data;
};

export const login = async (param: User): Promise<AuthResponse> => {
  const response = await apiClient.post('/users/login', param);
  return response.data;
};

export const getTodos = async (): Promise<Todo[]> => {
  const response = await apiClient.get<DataResponse<Todo[]>>('/todos', config);
  return response.data.data;
};

export const getTodoById = async (id: string): Promise<Todo> => {
  const response = await apiClient.get<DataResponse<Todo>>(
    `/todos/${id}`,
    config
  );
  return response.data.data;
};

export const createTodo = async (
  param: Pick<Todo, 'title' | 'content'>
): Promise<DataResponse<Todo>> => {
  const response = await apiClient.post('/todos', param, config);
  return response.data.data;
};

export const updateTodo = async (
  id: string,
  param: Pick<Todo, 'title' | 'content'>
): Promise<DataResponse<Todo>> => {
  const response = await apiClient.put(`/todos/${id}`, param, config);
  return response.data.data;
};

export const deleteTodo = async (id: string): Promise<DataResponse<null>> => {
  const response = await apiClient.delete(`/todos/${id}`, config);
  return response.data.data;
};
