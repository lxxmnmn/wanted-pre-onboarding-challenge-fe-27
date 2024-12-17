import axios from 'axios';
import { AuthResponse, TodoResponse, User, Todo } from '~types';

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

export const signUp = async (data: User): Promise<AuthResponse> => {
  const response = await apiClient.post('/users/create', data);
  return response.data;
};

export const login = async (data: User): Promise<AuthResponse> => {
  const response = await apiClient.post('/users/login', data);
  return response.data;
};

export const getTodos = async (): Promise<TodoResponse> => {
  const response = await apiClient.get('/todos', config);
  return response.data;
};

export const getTodoById = async (
  id: Pick<Todo, 'id'>
): Promise<TodoResponse> => {
  const response = await apiClient.get(`/todos/:${id}`, config);
  return response.data;
};

export const createTodo = async (
  data: Pick<Todo, 'title' | 'content'>
): Promise<TodoResponse> => {
  const response = await apiClient.post('/todos', data, config);
  return response.data;
};

export const updateTodo = async (
  id: Pick<Todo, 'id'>,
  data: Pick<Todo, 'title' | 'content'>
): Promise<TodoResponse> => {
  const response = await apiClient.put(`/todos/:${id}`, data, config);
  return response.data;
};

export const deleteTodo = async (
  id: Pick<Todo, 'id'>
): Promise<TodoResponse> => {
  const response = await apiClient.delete(`/todos/:${id}`, config);
  return response.data;
};
