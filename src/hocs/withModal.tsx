import { useState } from 'react';

import { Element } from '@/components/custom';
import { ModalCustomProps } from '@/components/custom/modal';

export const withModal = <T,>(Component: React.ElementType) => {
  const HOC = (props: Omit<T, 'openModal'>) => {
    const [modalProps, setModalProps] = useState<ModalCustomProps>({ open: false });
    const { onCancel, onOk, onSubmit, cancelButtonProps, ...rest } = modalProps;
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

    const handleModal = (props: ModalCustomProps) => {
      setModalProps({ ...props, open: true });
    };

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
      onCancel && onCancel(e);

      setModalProps({ ...modalProps, open: false });
    };

    const handleOk = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onSubmit) {
        setLoadingSubmit(true);
        await onSubmit();
        setLoadingSubmit(false);
      } else {
        onOk && onOk(e);
      }

      setModalProps({ ...modalProps, open: false });
    };

    return (
      <>
        <Element.Modal
          {...rest}
          onCancel={handleCancel}
          onOk={handleOk}
          confirmLoading={loadingSubmit}
          cancelButtonProps={{ ...cancelButtonProps, disabled: loadingSubmit || cancelButtonProps?.disabled }}
        />
        <Component openModal={handleModal} {...props} />
      </>
    );
  };

  return HOC;
};
