import { Alert, AlertProps } from 'antd';
import clsx from 'clsx';

import style from '@/styles/components/element/alert-message.module.scss';

export type AlertMessageProps = AlertProps;

export const AlertMessage = (props: AlertMessageProps) => {
  const { className, type } = props;

  if (!props?.message) {
    return null;
  }

  return <Alert {...props} type={type ?? 'success'} className={clsx(style['alert-message'], className)} />;
};
