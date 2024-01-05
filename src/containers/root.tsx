import { withAuthentication } from '@/hocs/withAuthentication';
import { withGuest } from '@/hocs/withGuest';
import { GuestLayout } from '@/layout/guest.tsx';
import { PrivateLayout } from '@/layout/private';

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

export const RootContainer = ({ children, layoutType }: Props) => {
  if (layoutType === ROOT_LAYOUT_TYPE.GUEST) {
    return <LayoutGuest>{children}</LayoutGuest>;
  }

  if (layoutType === ROOT_LAYOUT_TYPE.PRIVATE) {
    return <LayoutPrivate>{children}</LayoutPrivate>;
  }

  return <>{children}</>;
};
