import { Button as ButtonAntd, ButtonProps } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import style from '@/styles/components/element/button.module.scss';

declare const ButtonTypes: readonly ['primary', 'outlined', 'danger', 'none'];
declare const ButtonSizes: readonly ['xs', 'sm', 'md', 'lg'];

export interface BtnCustomProps extends Omit<ButtonProps, 'type' | 'size'> {
  type?: (typeof ButtonTypes)[number];
  size?: (typeof ButtonSizes)[number];
  link?: string;
}

export const Button = (props: BtnCustomProps) => {
  const { type, size, link, className, onClick, ...rest } = props;
  const router = useRouter();

  const customOnClick = (e: React.MouseEvent<HTMLElement>) => {
    if (link) {
      router.push(link);

      return;
    }

    onClick && onClick(e);
  };

  return (
    <ButtonAntd
      {...rest}
      onClick={customOnClick}
      className={clsx(style['button'], type && style[`button__type__${type}`], size && style[`button__size__${size}`], className)}
    >
      {props.children}
    </ButtonAntd>
  );
};
