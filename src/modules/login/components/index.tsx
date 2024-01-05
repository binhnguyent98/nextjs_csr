import { Button, Checkbox, Input } from 'antd';

import { CustomForm } from '@/components';
import { LAYOUT_TYPE } from '@/components/form/formControl';
import { useForm } from '@/hooks/useForm';
import style from '@/styles/pages/login/index.module.scss';

import { AuthFormDto, Props } from '../declare';
import { schema } from '../validate';

const Component = ({ onLogin }: Props) => {
  const { handleSubmit, control } = useForm<AuthFormDto>({
    schema,
  });

  return (
    <div className={style['login']}>
      <div className={style['login__inner']}>
        <h2 className={style['login__heading']}>{'Login Form'}</h2>
        <div className={style['login__form']}>
          <CustomForm.Control
            label="Email"
            name="email"
            layout={LAYOUT_TYPE.VERTICAL}
            required
            control={control}
            render={({ field }) => {
              return <Input {...field} />;
            }}
          />
          <CustomForm.Control
            label="Password"
            name="password"
            layout={LAYOUT_TYPE.VERTICAL}
            required
            control={control}
            render={({ field }) => {
              return <Input.Password {...field} />;
            }}
          />
          <CustomForm.Control
            name="isRemember"
            required
            control={control}
            render={({ field }) => {
              return <Checkbox {...field}>{'Is remember'}</Checkbox>;
            }}
          />
          <div className={style['login__form__action']}>
            <Button htmlType="button" onClick={handleSubmit(onLogin)}>
              {'Login'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Index = Component;
