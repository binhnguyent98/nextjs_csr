import { Table as TableAntd, TableProps as TableAntdProps } from 'antd';
import clsx from 'clsx';
import React from 'react';

import style from '@/styles/components/element/table.module.scss';

type Props<RecordType = any> = TableAntdProps<RecordType>;

export const Table = (props: Props) => {
  return <TableAntd {...props} className={clsx(style['table'], props.className)} />;
};
