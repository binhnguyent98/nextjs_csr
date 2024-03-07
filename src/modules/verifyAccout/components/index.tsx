import clsx from 'clsx';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { LoadingWrapper } from '@/components';
import style from '@/styles/pages/verify-account/index.module.scss';

import { Props } from '../declare';

export const Component = (props: Props) => {
  const { t } = useTranslation('verifyAccount');
  const { isLoading, isVerify } = props;

  const text = useMemo(() => (isVerify ? t('message.success') : t('message.error')), [isVerify]);

  return (
    <div className={style['verify-account']}>
      <LoadingWrapper isLoading={isLoading}>
        <div className={style['verify-account__thumbnail']}>
          <Image
            alt=""
            width={120}
            height={80}
            src={isVerify ? '/images/pages/verify-account/verify_thumbnail.png' : '/images/pages/verify-account/error.png'}
          />
          <p className={clsx(isVerify ? 'text-success' : 'text-error', 'text-center font-semibold mt-2')}>{text}</p>
        </div>
      </LoadingWrapper>
    </div>
  );
};
