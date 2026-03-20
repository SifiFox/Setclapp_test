export const STORAGE_KEY = 'table-data';

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 100;
export const DATE_DISPLAY_FORMAT = 'DD.MM.YYYY';

export const COLUMN_TEXT = {
  name: 'Имя',
  date: 'Дата',
  value: 'Значение',
  actions: 'Действия',
  deleteConfirmTitle: 'Удалить запись?',
  deleteConfirmDescription: 'Запись будет удалена',
  deleteOk: 'Удалить',
  deleteCancel: 'Отмена',
} as const;

export const MODAL_TEXT = {
  addTitle: 'Добавить запись',
  editTitle: 'Редактировать запись',
  addOk: 'Добавить',
  editOk: 'Сохранить',
  cancel: 'Отмена',
  nameLabelText: 'Имя',
  namePlaceholder: 'Введите имя',
  nameRequired: 'Введите имя',
  nameMin: `Минимум ${NAME_MIN_LENGTH} символа`,
  nameMax: `Максимум ${NAME_MAX_LENGTH} символов`,
  dateLabelText: 'Дата',
  datePlaceholder: 'Выберите дату',
  dateRequired: 'Выберите дату',
  valueLabelText: 'Значение',
  valuePlaceholder: 'Введите числовое значение',
  valueRequired: 'Введите значение',
  valueType: 'Должно быть числом',
} as const;

export const TABLE_TEXT = {
  title: 'Таблица записей',
  searchPlaceholder: 'Поиск по всем полям...',
  addButton: 'Добавить',
  emptyDefault: 'Нет данных. Добавьте первую запись.',
  emptySearch: 'Ничего не найдено',
  paginationTotal: (total: number) => `Всего: ${total}`,
} as const;
