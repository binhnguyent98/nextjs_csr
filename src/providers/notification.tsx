import { notification as NotificationHook } from 'antd';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import { maxCountNotification, NotificationType } from '@/constants';

interface NotificationContextProps {
  handleSetNotification: (data: NotificationProps) => void;
}

export interface NotificationProps {
  title?: string;
  description?: string;
  type: NotificationType;
}

export const NotificationContext = createContext<NotificationContextProps>(undefined as any);

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [notification, setNotification] = useState<NotificationProps>();
  const [api, contextHolder] = NotificationHook.useNotification({ maxCount: maxCountNotification });

  const handleSetNotification = (data: NotificationProps) => {
    setNotification({ ...data, type: data.type });
  };

  useEffect(() => {
    if (!notification) {
      return;
    }

    api[notification.type]({
      message: notification?.title,
      description: notification?.description,
      duration: 3,
    });
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ handleSetNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
