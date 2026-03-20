import dayjs from "dayjs";
import type { TableItem } from "@/types";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, STORAGE_KEY } from "@/constants";

const isValidData = (value: unknown): value is TableItem => {
  if (!value || typeof value !== "object") return false;

  const r = value as Record<string, unknown>;

  if (typeof r.id !== "string" || r.id.trim() === "") return false;
  if (typeof r.name !== "string") return false;

  const trimmedName = r.name.trim();
  if (
    trimmedName.length < NAME_MIN_LENGTH ||
    trimmedName.length > NAME_MAX_LENGTH
  )
    return false;

  if (typeof r.date !== "string" || !dayjs(r.date).isValid()) return false;
  if (typeof r.value !== "number" || !isFinite(r.value)) return false;

  return true;
};

export const loadLocalStorageData = (): TableItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: TableItem[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isValidData);
  } catch {
    return [];
  }
};

export const saveLocalStorageData = (records: TableItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};
