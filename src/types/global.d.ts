import { ModalCustomProps } from '@/components/custom/modal';
import { ROOT_LAYOUT_TYPE } from '@/containers/root';

declare global {
  type PageProps<P = object> = React.FC<P> & {
    layoutType?: ROOT_LAYOUT_TYPE;
  };
}

declare global {
  type ComponentWithModal = {
    openModal: (props: ModalCustomProps) => void;
  };
}
