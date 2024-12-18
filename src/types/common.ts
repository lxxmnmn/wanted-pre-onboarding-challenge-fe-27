export interface AuthResponse {
  message: string;
  token: string;
}

export interface DataResponse<T> {
  data: T;
}
