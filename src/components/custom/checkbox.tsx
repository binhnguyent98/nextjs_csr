import { Checkbox as CheckboxAntd, CheckboxProps as CheckboxAntdProps } from 'antd';
import clsx from 'clsx';

import style from '@/styles/components/element/checkbox.module.scss';

type CheckboxProps = CheckboxAntdProps;

export const Checkbox = (props: CheckboxProps) => {
  const { className } = props;

  return <CheckboxAntd {...props} className={clsx(style['checkbox'], className)} />;
};
