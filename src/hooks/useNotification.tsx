import { useContext } from 'react';

import { NotificationContext } from '@/providers/notification';

export const useNotification = () => {
  const { handleSetNotification } = useContext(NotificationContext);

  return {
    notification: handleSetNotification,
  };
};
