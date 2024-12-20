import { create } from 'zustand';
import { TOAST } from '~constants';
import { ToastState } from '~types';

export const useToastStore = create<ToastState>((set) => ({
  isOpen: false,
  severity: TOAST.ERROR,
  message: '',
  setMessage: (severity, message) => set({ isOpen: true, severity, message }),
  clearMessage: () => set({ isOpen: false }),
}));
