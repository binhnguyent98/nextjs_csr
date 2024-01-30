import { withAuthentication } from '@/hocs/withAuthentication';
import { withGuest } from '@/hocs/withGuest';
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
  return (
    <ConfigAntd>
      <GetLayout layoutType={layoutType}>{children}</GetLayout>
    </ConfigAntd>
  );
};
