import { Button as ButtonAntd, ButtonProps } from 'antd';
import clsx from 'clsx';

import style from '@/styles/components/element/button.module.scss';

declare const ButtonTypes: readonly ['primary', 'outlined', 'danger'];
declare const ButtonSizes: readonly ['xs', 'sm', 'md', 'lg'];

interface BtnProps extends Omit<ButtonProps, 'type' | 'size'> {
  type?: (typeof ButtonTypes)[number];
  size?: (typeof ButtonSizes)[number];
}

export const Button = (props: BtnProps) => {
  const { type, size, className, ...rest } = props;

  return (
    <ButtonAntd
      {...rest}
      className={clsx(style['button'], type && style[`button__type__${type}`], size && style[`button__size__${size}`], className)}
    >
      {props.children}
    </ButtonAntd>
  );
};
