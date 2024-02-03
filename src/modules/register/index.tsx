import { Index as RegisterComponent } from './components/index';
import { useLogic } from './useLogic';

export const Index: PageProps = () => {
  const props = useLogic();

  return <RegisterComponent {...props} />;
};
