import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

import { LoadingWrapper } from '@/components';
import { Element } from '@/components/custom';
import { PATH } from '@/constants/path';
import { VerifyAccountReqDto } from '@/dto/request/verifyAccount';
import style from '@/styles/pages/verify-account/index.module.scss';

import { ErrorKeyTokenExpired, Props } from '../declare';

export const Component = (props: Props) => {
  const { t } = useTranslation('verifyAccount');
  const { isLoading, isVerify, resendVerify, errorKey } = props;

  return (
    <div className={style['verify-account']}>
      <LoadingWrapper isLoading={isLoading}>
        <div className={style['verify-account__inner']}>
          <div className={style['verify-account__inner__triangle']} />
          <div className={style['verify-account__thumbnail']}>
            <Image
              alt=""
              width={60}
              height={20}
              src={isVerify ? '/images/pages/verify-account/verify_thumbnail.png' : '/images/pages/verify-account/error.png'}
            />
          </div>
          <div className={style['verify-account__txt']}>
            <p className="font-bold text-lg">{isVerify ? t('message.verified') : t('message.error')}</p>
            <p className="">{isVerify ? t('message.verified_des') : t(`message.${errorKey}`, undefined, { fallback: t('message.error_des') })}</p>
          </div>
          {isVerify && (
            <Element.Button type="primary" link={PATH.LOGIN}>
              {t('btn_login')}
            </Element.Button>
          )}
          {!isVerify && errorKey === ErrorKeyTokenExpired && (
            <Element.Button
              type="outlined"
              loading={resendVerify.isLoading}
              onClick={() => resendVerify.onAction(new VerifyAccountReqDto({ token: '' }))}
            >
              {t('btn_resent_email')}
            </Element.Button>
          )}
        </div>
      </LoadingWrapper>
    </div>
  );
};
