import { lazy, memo, Suspense, useCallback, useMemo } from 'react';
import { Typography } from 'antd';
import dayjs from 'dayjs';

import { getColumns } from './columns';
import { TableView } from './table-view';
import { TableToolbar } from './table-toolbar';

import { DATE_DISPLAY_FORMAT, TABLE_TEXT } from '@/constants';
import { usePersistentState, useSearchQueryParam, useTableModal } from '@/hooks';

import styles from './data-table.module.css';

const { Title } = Typography;

const LazyTableModal = lazy(() =>
  import('@/components/modals/table-modal/table-modal').then((module) => ({ default: module.TableModal })),
);

const TableTitle = memo(() => {
  return (
    <Title level={3} className={styles.title}>
      {TABLE_TEXT.title}
    </Title>
  );
});

export const DataTable = () => {
  const [persistedState, setPersistedState] = usePersistentState();
  const [search, setSearch] = useSearchQueryParam();
  const { modalState, handleAdd, handleEdit, handleClose, handleSubmit } = useTableModal(setPersistedState);

  const filtered = useMemo(
    () =>
      persistedState.filter((item) =>
        [item.name, dayjs(item.date).format(DATE_DISPLAY_FORMAT), String(item.value)].some((value) =>
          value.toLowerCase().includes(search.toLowerCase()),
        ),
      ),
    [persistedState, search],
  );

  const emptyText = search ? TABLE_TEXT.emptySearch : TABLE_TEXT.emptyDefault;

  const handleDelete = useCallback(
    (id: string) => setPersistedState((data) => data.filter((item) => item.id !== id)),
    [],
  );

  const columns = useMemo(
    () => getColumns({ onEdit: handleEdit, onDelete: handleDelete }),
    [handleEdit, handleDelete],
  );

  return (
    <div className={styles.root}>
      <TableTitle />
      <TableToolbar initialSearch={search} onSearch={setSearch} onAdd={handleAdd} />
      <TableView
        dataSource={filtered}
        columns={columns}
        emptyText={emptyText}
      />
      <Suspense fallback={null}>
        <LazyTableModal
          open={modalState.open}
          data={modalState.data}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      </Suspense>
    </div>
  );
}
