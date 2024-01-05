import { ROOT_LAYOUT_TYPE } from '@/containers/root';

declare global {
  type PageProps<P = object> = React.FC<P> & {
    layoutType?: ROOT_LAYOUT_TYPE;
  };
}
