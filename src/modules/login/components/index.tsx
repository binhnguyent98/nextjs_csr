import { Button, Checkbox, Form, Input } from 'antd';
import useTranslation from 'next-translate/useTranslation';

import { CustomForm } from '@/components';
import { LAYOUT_TYPE } from '@/components/form/formControl';
import { useForm } from '@/hooks/useForm';
import style from '@/styles/pages/login/index.module.scss';

import { AuthFormDto, Props } from '../declare';
import { schema } from '../validate';

const Component = ({ onLogin }: Props) => {
  const { t } = useTranslation('login');

  const { handleSubmit, control } = useForm<AuthFormDto>({
    schema,
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
            <div className={style['login__form__action']}>
              <Button htmlType="button" onClick={handleSubmit(onLogin)}>
                {t('common:action.submit')}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export const Index = Component;
