import { memo, useCallback, useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Button, Input } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useDebouncedCallback } from '@/hooks';
import { TABLE_TEXT } from '@/constants';
import styles from './data-table.module.css';

const SEARCH_PREFIX = <SearchOutlined />;
const PLUS_ICON = <PlusOutlined />;
const SEARCH_DEBOUNCE_MS = 300;

interface TableToolbarProps {
  initialSearch: string;
  onSearch: (value: string) => void;
  onAdd: () => void;
}

const AddButton = memo(({ onAdd }: { onAdd: () => void }) => {
  return (
    <Button type="primary" icon={PLUS_ICON} onClick={onAdd}>
      {TABLE_TEXT.addButton}
    </Button>
  );
});

export const TableToolbar = memo(({ initialSearch, onSearch, onAdd }: TableToolbarProps) => {
  const [search, setSearch] = useState(initialSearch);

  const debouncedSearch = useDebouncedCallback(onSearch, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearch(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  return (
    <div className={styles.toolbar}>
      <Input
        className={styles.searchInput}
        placeholder={TABLE_TEXT.searchPlaceholder}
        prefix={SEARCH_PREFIX}
        value={search}
        onChange={handleChange}
        allowClear
      />
      <AddButton onAdd={onAdd} />
    </div>
  );
});
