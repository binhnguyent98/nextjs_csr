import clsx from 'clsx';

import styles from '@/styles/components/form/form-control-item.module.scss';

interface Props {
  error?: string;
  children?: React.ReactElement;
}

export const FormControlItem = ({ children, error }: Props) => {
  return (
    <div className={styles['form-control-item']}>
      <div className={clsx(!!error && styles['form-control-item__box-error'])}>{children}</div>
      <div className={styles['form-control-item__error']}>{error}</div>
    </div>
  );
};
