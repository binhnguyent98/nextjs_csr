import { useRouter } from 'next/router';
import nProgress from 'nprogress';

import { Element } from '@/components/custom';
import { withAuthentication } from '@/hocs/withAuthentication';
import { withGuest } from '@/hocs/withGuest';
import { useLanguage } from '@/hooks';
import { GuestLayout } from '@/layout/guest.tsx';
import { PrivateLayout } from '@/layout/private';
import { ConfigAntd } from '@/providers/configAntd';

type Props = {
  children: React.ReactElement;
  layoutType: ROOT_LAYOUT_TYPE;
};

export enum ROOT_LAYOUT_TYPE {
  PRIVATE = 'private',
  GUEST = 'guest',
}

const LayoutGuest = withGuest(GuestLayout);
const LayoutPrivate = withAuthentication(PrivateLayout);

export const GetLayout = ({ children, layoutType }: Props) => {
  if (layoutType === ROOT_LAYOUT_TYPE.GUEST) {
    return <LayoutGuest>{children}</LayoutGuest>;
  }

  if (layoutType === ROOT_LAYOUT_TYPE.PRIVATE) {
    return <LayoutPrivate>{children}</LayoutPrivate>;
  }

  return <>{children}</>;
};

export const RootContainer = ({ children, layoutType }: Props) => {
  const router = useRouter();
  const { getLangOptions, changeLang, defaultLang } = useLanguage();

  router.events.on('routeChangeStart', () => nProgress.start());
  router.events.on('routeChangeComplete', () => nProgress.done());
  router.events.on('routeChangeError', () => nProgress.done());

  return (
    <ConfigAntd>
      <div className="fixed right-0 top-1 p-4">
        <Element.Select defaultValue={defaultLang} options={getLangOptions()} onChange={(e) => changeLang(e)} />
      </div>
      <GetLayout layoutType={layoutType}>{children}</GetLayout>
    </ConfigAntd>
  );
};
