import type { TableColumnsType } from 'antd';
import { Button, Popconfirm, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { TableItem } from '@/types';
import { COLUMN_TEXT, DATE_DISPLAY_FORMAT } from '@/constants';
import { memo } from 'react';

const EDIT_ICON = <EditOutlined />;
const DELETE_ICON = <DeleteOutlined />;
const POPCONFIRM_OK_PROPS = { danger: true } as const;

interface RowActionsProps {
  data: TableItem;
  onEdit: (data: TableItem) => void;
  onDelete: (id: string) => void;
}

interface GetColumnsOptions {
  onEdit: (data: TableItem) => void;
  onDelete: (id: string) => void;
}

const RowActions = memo(({ data, onEdit, onDelete }: RowActionsProps) => {
  const handleEdit = () => onEdit(data);
  const handleConfirm = () => onDelete(data.id);

  return (
    <Space size="small">
      <Button type="text" icon={EDIT_ICON} onClick={handleEdit} />
      <Popconfirm
        title={COLUMN_TEXT.deleteConfirmTitle}
        description={COLUMN_TEXT.deleteConfirmDescription}
        okText={COLUMN_TEXT.deleteOk}
        cancelText={COLUMN_TEXT.deleteCancel}
        okButtonProps={POPCONFIRM_OK_PROPS}
        onConfirm={handleConfirm}
      >
        <Button type="text" danger icon={DELETE_ICON} />
      </Popconfirm>
    </Space>
  );
});

export const getColumns = ({ onEdit, onDelete }: GetColumnsOptions): TableColumnsType<TableItem> => {
  return [
    {
      title: COLUMN_TEXT.name,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name, 'ru'),
      showSorterTooltip: false,
      ellipsis: true,
    },
    {
      title: COLUMN_TEXT.date,
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      showSorterTooltip: false,
      render: (date: string) => dayjs(date).format(DATE_DISPLAY_FORMAT),
      width: 140,
    },
    {
      title: COLUMN_TEXT.value,
      dataIndex: 'value',
      key: 'value',
      sorter: (a, b) => a.value - b.value,
      showSorterTooltip: false,
      width: 140,
      align: 'right',
    },
    {
      title: COLUMN_TEXT.actions,
      key: 'actions',
      width: 110,
      align: 'center',
      render: (_, data) => (
        <RowActions data={data} onEdit={onEdit} onDelete={onDelete} />
      ),
    },
  ];
};
