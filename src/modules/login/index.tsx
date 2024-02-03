import { Index as LoginComponent } from './components/index';
import { useLogic } from './useLogic';

export const Index: PageProps = () => {
  const props = useLogic();

  return <LoginComponent {...props} />;
};
