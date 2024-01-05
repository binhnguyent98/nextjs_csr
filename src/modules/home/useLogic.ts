import { useDispatch } from '@/store';
import { authenticationAction } from '@/store/action';

import { Props } from './declare';

export const useLogic = (): Props => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(authenticationAction.resetAuthentication());
  };

  return {
    onLogout,
  };
};
