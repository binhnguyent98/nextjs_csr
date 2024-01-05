import { Button } from 'antd';

import { Props } from '../declare';

const Component = (props: Props) => {
  return (
    <div>
      <div>{'Coming soon'}</div>
      <Button onClick={props.onLogout}>{'Logout'}</Button>
    </div>
  );
};

export const Index = Component;
