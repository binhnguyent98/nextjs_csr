import { Select as SelectAntd, SelectProps as SelectAntdProps } from 'antd';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';

import style from '@/styles/components/element/select.module.scss';

interface SelectProps extends SelectAntdProps {
  blankOption?: boolean | string;
}

export const Select = (props: SelectProps) => {
  const { t } = useTranslation('common');
  const { blankOption, options, className, ...rest } = props;
  const customOption = blankOption
    ? [
        {
          label: t('form.select.blank_option'),
          value: '',
        },
        ...(options || []),
      ]
    : options;

  return <SelectAntd {...rest} options={customOption} className={clsx(style['select'], className)} />;
};
