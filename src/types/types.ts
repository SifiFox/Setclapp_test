export interface TableItem {
  id: string;
  name: string;
  date: string;
  value: number;
}

export interface ModalState {
  open: boolean;
  data?: TableItem;
}
