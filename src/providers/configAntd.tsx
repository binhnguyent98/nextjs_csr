import { ConfigProvider, ThemeConfig } from 'antd';
import { PropsWithChildren } from 'react';

import { RenderEmpty } from '@/components/renderEmpty';

export const ConfigAntd = ({ children }: PropsWithChildren) => {
  const defaultHeightControl = 30;

  const theme: ThemeConfig = {
    components: {
      Input: {
        controlHeight: defaultHeightControl,
      },
      Select: {
        controlHeight: defaultHeightControl,
      },
    },
  };

  return (
    <ConfigProvider renderEmpty={RenderEmpty} theme={theme}>
      {children}
    </ConfigProvider>
  );
};
