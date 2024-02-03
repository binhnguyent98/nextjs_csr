import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { snakeCase } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import { PropsWithChildren } from 'react';

import { ResponseTemplate } from '@/dto/response';
import { errorCommonHandler } from '@/hooks/useCallApi/declare';
import { useNotification } from '@/hooks/useNotification';

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  const { notification } = useNotification();
  const { t } = useTranslation('common');

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
      mutations: {
        retry: 0,
        // eslint-disable-next-line @typescript-eslint/naming-convention, max-params
        onSettled(_data, error, _variables, _context) {
          const newError = error as ResponseTemplate;

          const errorKey = newError?.error?.errorKey;

          const isHandleError = errorCommonHandler.includes(errorKey || '');

          if (isHandleError) {
            const langKey = errorKey ? snakeCase(errorKey) : 'default';

            const message = t(`message.error.${langKey}`);

            notification({
              title: message,
              type: 'error',
            });
          }
        },
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
