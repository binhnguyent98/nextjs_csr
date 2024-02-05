import { Form, Input } from 'antd';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { CiLink } from 'react-icons/ci';

import { CustomForm } from '@/components';
import { Element } from '@/components/custom';
import { LAYOUT_TYPE } from '@/components/form/formControl';
import { PATH } from '@/constants/path';
import { useForm } from '@/hooks';
import style from '@/styles/pages/register/index.module.scss';

import { Props, RegisterFormDto } from '../declare';
import { schema } from '../validate';

const Component = ({ onRegister, notice }: Props) => {
  const { t } = useTranslation('register');

  const { handleSubmit, control } = useForm<RegisterFormDto>({
    schema: schema(t),
  });

  return (
    <div className={style['register']}>
      <div className={style['register__inner']}>
        <h2 className={style['register__heading']}>{t('title')}</h2>
        <Form>
          <div className={style['register__form']}>
            <CustomForm.Control
              label={t('fields.name')}
              name="name"
              layout={LAYOUT_TYPE.VERTICAL}
              control={control}
              render={({ field }) => {
                return <Input autoComplete="off" {...field} />;
              }}
            />
            <CustomForm.Control
              label={t('fields.email')}
              name="email"
              layout={LAYOUT_TYPE.VERTICAL}
              required
              control={control}
              render={({ field }) => {
                return <Input autoComplete="off" {...field} />;
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
            <Link href={PATH.LOGIN} className={style['register__link']}>
              <CiLink />
              {t('link.login')}
            </Link>
            <Element.AlertMessage {...notice} className={style['register__notice']} />
            <div className={style['register__form__action']}>
              <Element.Button htmlType="button" type="primary" size="xs" onClick={handleSubmit(onRegister)}>
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
