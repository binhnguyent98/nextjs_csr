import { Button } from 'antd';
import useTranslation from 'next-translate/useTranslation';

import { Props } from '../declare';

const Component = (props: Props) => {
  const { t } = useTranslation('common');

  return (
    <div>
      <div>{'Coming soon'}</div>
      <Button onClick={props.onLogout}>{t('action.logout')}</Button>
    </div>
  );
};

export const Index = Component;
