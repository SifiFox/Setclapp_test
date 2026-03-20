import { memo } from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import type { TableItem } from '@/types';
import { TABLE_TEXT } from '@/constants';

const TABLE_SCROLL = { x: 600 } as const;

const TABLE_PAGINATION = {
  pageSize: 10,
  showSizeChanger: true,
  showTotal: TABLE_TEXT.paginationTotal,
} as const;

interface TableViewProps {
  dataSource: TableItem[];
  columns: TableColumnsType<TableItem>;
  emptyText: string;
  loading?: boolean;
}

export const TableView = memo(({
  dataSource,
  columns,
  emptyText,
  loading,
}: TableViewProps) => {
  return (
    <Table<TableItem>
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      pagination={TABLE_PAGINATION}
      locale={{ emptyText }}
      scroll={TABLE_SCROLL}
      loading={loading}
    />
  );
});
