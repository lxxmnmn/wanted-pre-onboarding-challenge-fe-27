export interface Todo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoState {
  activeId: string;
  isReadOnly: boolean;
  showDetail: boolean;
}
