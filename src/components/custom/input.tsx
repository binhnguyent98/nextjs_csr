import { Input as InputAntd, InputProps as InputAntdProps } from 'antd';

type InputProps = InputAntdProps;

const Input = (props: InputProps) => {
  return <InputAntd {...props} />;
};

const NumberComponent = (props: InputProps) => {
  return <InputAntd {...props} />;
};

Input.Number = NumberComponent;

export { Input };
