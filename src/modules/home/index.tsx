import { Index as HomeComponent } from './components';
import { useLogic } from './useLogic';

export const Index: PageProps = () => {
  const props = useLogic();

  return <HomeComponent {...props} />;
};
