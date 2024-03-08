import { Form } from 'antd';

import styles from '@/styles/components/form/form-control-item.module.scss';

interface Props {
  error?: string;
  children?: React.ReactElement;
}

export const FormControlItem = ({ children, error }: Props) => {
  return (
    <Form.Item className={styles['form-control-item']} help={error} validateStatus={error && 'error'}>
      {children}
    </Form.Item>
  );
};
