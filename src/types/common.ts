import { Todo } from './todo';

export interface AuthResponse {
  message: string;
  token: string;
}

export interface TodoResponse {
  data: Todo | null;
}
