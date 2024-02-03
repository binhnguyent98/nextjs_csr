import { Modal as ModalAntd, ModalProps } from 'antd';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { IoMdCloseCircleOutline } from 'react-icons/io';

import { Element } from '@/components/custom';
import style from '@/styles/components/element/modal.module.scss';

import { BtnCustomProps } from './button';

export type ModalCustomProps = Omit<ModalProps, 'okButtonProps' | 'cancelButtonProps'> & {
  onSubmit?: () => Promise<void>;
  okButtonProps?: BtnCustomProps;
  cancelButtonProps?: BtnCustomProps;
  body?: React.ReactNode;
};

export const Modal = (props: ModalCustomProps) => {
  const { t } = useTranslation('common');
  const { className, okButtonProps, cancelButtonProps, okText, cancelText, onOk, body, children, closable, title, ...rest } = props;

  return (
    <ModalAntd
      {...rest}
      className={clsx(style['modal'], className)}
      closable={false}
      title={false}
      footer={[
        <Element.Button key="submit" type="primary" {...okButtonProps} onClick={onOk}>
          {okText ?? t('action.submit')}
        </Element.Button>,
        <Element.Button key="cancel" type="outlined" {...cancelButtonProps} onClick={props?.onCancel}>
          {cancelText ?? t('action.cancel')}
        </Element.Button>,
      ]}
    >
      <div className={style['modal__header']}>
        {!closable && (
          <div className={style['modal__header__closable']}>
            <Element.Button type="none" onClick={props?.onCancel}>
              <IoMdCloseCircleOutline size={20} />
            </Element.Button>
          </div>
        )}
        {!!title && <div className={style['modal__header__title']}>{title}</div>}
        {body}
        {children}
      </div>
    </ModalAntd>
  );
};
