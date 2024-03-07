import { Spin } from 'antd';
import React from 'react';

import style from '@/styles/components/loading/wrapper-loading.module.scss';

type Props = {
  children: React.ReactNode;
  isLoading: boolean;
};

export const LoadingWrapper = (props: Props) => {
  if (props.isLoading) {
    return (
      <div className={style['wrapper-loading']}>
        <Spin />
      </div>
    );
  }

  return props.children;
};
