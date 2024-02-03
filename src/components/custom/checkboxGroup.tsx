import { Checkbox } from 'antd';
import { CheckboxGroupProps as CheckboxGroupAtndProps } from 'antd/es/checkbox';
import clsx from 'clsx';

import style from '@/styles/components/element/CheckboxGroup-group.module.scss';

type CheckboxGroupProps = CheckboxGroupAtndProps;

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { className } = props;

  return <Checkbox.Group {...props} className={clsx(style['CheckboxGroup'], className)} />;
};
