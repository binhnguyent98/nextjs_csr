import { Spin } from 'antd';

import styles from '@/styles/components/loading/app-loading.module.scss';

export const AppLoading = () => {
  return (
    <>
      <div className={styles['app-loading']}>
        <div />
        <div />
        <Spin className={styles['app-loading__spin']} />
      </div>
    </>
  );
};
