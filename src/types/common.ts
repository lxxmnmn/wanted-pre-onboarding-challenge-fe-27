import { TOAST } from '~constants';

export interface AuthResponse {
  message: string;
  token: string;
}

export interface DataResponse<T> {
  data: T;
}

type ToastSeverity = (typeof TOAST)[keyof typeof TOAST];

export interface ToastState {
  isOpen: boolean;
  severity: ToastSeverity;
  message: string;
  setMessage: (severity: ToastSeverity, message: string) => void;
  clearMessage: () => void;
}
