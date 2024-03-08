import { Checkbox, Form, Input } from 'antd';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { CiLink } from 'react-icons/ci';

import { CustomForm } from '@/components';
import { Element } from '@/components/custom';
import { LAYOUT_TYPE } from '@/components/form/formControl';
import { PATH } from '@/constants/path';
import { useForm } from '@/hooks';
import style from '@/styles/pages/login/index.module.scss';

import { AuthFormDto, Props } from '../declare';
import { schema } from '../validate';

const Component = ({ onLogin, notice, clearError }: Props) => {
  const { t } = useTranslation('login');

  const { handleSubmit, control } = useForm<AuthFormDto>({
    schema: schema(t),
    clearError,
  });

  return (
    <div className={style['login']}>
      <div className={style['login__inner']}>
        <h2 className={style['login__heading']}>{t('title')}</h2>
        <Form>
          <div className={style['login__form']}>
            <CustomForm.Control
              label={t('fields.email')}
              name="email"
              layout={LAYOUT_TYPE.VERTICAL}
              required
              control={control}
              render={({ field }) => {
                return <Input {...field} />;
              }}
            />
            <CustomForm.Control
              label={t('fields.password')}
              name="password"
              layout={LAYOUT_TYPE.VERTICAL}
              required
              control={control}
              render={({ field }) => {
                return <Input.Password autoComplete="off" {...field} />;
              }}
            />
            <CustomForm.Control
              name="isRemember"
              required
              control={control}
              render={({ field }) => {
                return (
                  <Checkbox defaultChecked={false} {...field}>
                    {t('fields.remember')}
                  </Checkbox>
                );
              }}
            />
            <Link href={PATH.REGISTER} className={style['login__link']}>
              <CiLink />
              {t('link.register')}
            </Link>
            <Element.AlertMessage {...notice} className={style['login__notice']} />
            <div className={style['login__form__action']}>
              <Element.Button htmlType="button" type="primary" size="xs" onClick={handleSubmit(onLogin)}>
                {t('common:action.submit')}
              </Element.Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export const Index = Component;
