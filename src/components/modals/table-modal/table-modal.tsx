import { memo, useEffect } from 'react';
import { DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import dayjs from 'dayjs';
import type { TableItem } from '@/types';
import {
  DATE_DISPLAY_FORMAT,
  MODAL_TEXT,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '@/constants';
import styles from './table-modal.module.css';

interface TableModalProps {
  open: boolean;
  data?: TableItem;
  onClose: () => void;
  onSubmit: (values: Omit<TableItem, 'id'>) => void;
}

interface FormValues {
  name: string;
  date: dayjs.Dayjs;
  value: number;
}

export const TableModal = memo(({ open, data, onClose, onSubmit }: TableModalProps) => {
  const [form] = Form.useForm<FormValues>();
  const isEditing = Boolean(data);

  useEffect(() => {
    if (open) {
      if (data) {
        form.setFieldsValue({
          name: data.name,
          date: dayjs(data.date),
          value: data.value,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, data, form]);

  const handleApprove = async () => {
    const values = await form.validateFields();
    onSubmit({
      name: values.name.trim(),
      date: values.date.toISOString(),
      value: values.value,
    });
  };

  return (
    <Modal
      title={isEditing ? MODAL_TEXT.editTitle : MODAL_TEXT.addTitle}
      open={open}
      onOk={handleApprove}
      onCancel={onClose}
      okText={isEditing ? MODAL_TEXT.editOk : MODAL_TEXT.addOk}
      cancelText={MODAL_TEXT.cancel}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" className={styles.modalForm}>
        <Form.Item
          name="name"
          label={MODAL_TEXT.nameLabelText}
          rules={[
            { required: true, message: MODAL_TEXT.nameRequired },
            { min: NAME_MIN_LENGTH, message: MODAL_TEXT.nameMin },
            { max: NAME_MAX_LENGTH, message: MODAL_TEXT.nameMax },
          ]}
        >
          <Input placeholder={MODAL_TEXT.namePlaceholder} autoFocus />
        </Form.Item>

        <Form.Item
          name="date"
          label={MODAL_TEXT.dateLabelText}
          rules={[{ required: true, message: MODAL_TEXT.dateRequired }]}
        >
          <DatePicker
            className={styles.fullWidth}
            format={DATE_DISPLAY_FORMAT}
            placeholder={MODAL_TEXT.datePlaceholder}
          />
        </Form.Item>

        <Form.Item
          name="value"
          label={MODAL_TEXT.valueLabelText}
          rules={[
            { required: true, message: MODAL_TEXT.valueRequired },
            { type: 'number', message: MODAL_TEXT.valueType },
          ]}
        >
          <InputNumber
            className={styles.fullWidth}
            placeholder={MODAL_TEXT.valuePlaceholder}
            precision={2}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});
