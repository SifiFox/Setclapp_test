import { useEffect, useState } from "react";
import type { TableItem } from "@/types";
import { loadLocalStorageData, saveLocalStorageData } from "@/utils";

export const usePersistentState = () => {
  const [persistedState, setPersistedState] = useState<TableItem[]>(() =>
    loadLocalStorageData(),
  );

  useEffect(() => {
    saveLocalStorageData(persistedState);
  }, [persistedState]);

  return [persistedState, setPersistedState] as const;
};
