import useTranslation from 'next-translate/useTranslation';

import style from '@/styles/components/render-empty.module.scss';

export const RenderEmpty = () => {
  const { t } = useTranslation('common');

  return <div className={style['render-empty']}>{t('label.empty_data')}</div>;
};
