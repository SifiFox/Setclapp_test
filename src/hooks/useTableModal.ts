import {
  useCallback,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { v4 as uuidv4 } from "uuid";
import type { ModalState, TableItem } from "@/types";

type SetData = Dispatch<SetStateAction<TableItem[]>>;

export function useTableModal(setData: SetData) {
  const [modalState, setModalState] = useState<ModalState>({ open: false });

  const editingDataRef = useRef<TableItem | undefined>(undefined);
  editingDataRef.current = modalState.data;

  const handleAdd = useCallback(() => setModalState({ open: true }), []);

  const handleEdit = useCallback(
    (data: TableItem) => setModalState({ open: true, data }),
    [],
  );

  const handleClose = useCallback(() => setModalState({ open: false }), []);

  const handleSubmit = useCallback((values: Omit<TableItem, "id">) => {
    if (editingDataRef.current) {
      const id = editingDataRef.current.id;
      setData((data) =>
        data.map((item) => (item.id === id ? { ...item, ...values } : item)),
      );
    } else {
      setData((data) => [...data, { id: uuidv4(), ...values }]);
    }
    setModalState({ open: false });
  }, []);

  return { modalState, handleAdd, handleEdit, handleClose, handleSubmit };
}
