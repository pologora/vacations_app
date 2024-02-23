import { createContext, ReactNode, useEffect, useState } from 'react';

import { getSafeContext } from './getSafeContext';

type NotificationBgColor = string;

type TNotification = {
  text: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  variant: 'filled' | 'outlined';
  hideDuration: number;
};

type NotificationContextProps = {
  setTimeoutDuration: (time: number) => void;
  notification: TNotification;
  isOpen: boolean;
  handleChangeNotification: (options: TNotification) => void;
};

const NotificationContext = createContext<NotificationContextProps | null>(null);

type NotificationContextProviderProps = {
  children: ReactNode;
};

const DEFAULT_TIMEOUT_DURATION = 2000;

const NotificationContextProvider = ({ children }: NotificationContextProviderProps) => {
  const [notification, setNotification] = useState<TNotification>({
    severity: 'success',
    variant: 'outlined',
    text: '',
    hideDuration: DEFAULT_TIMEOUT_DURATION,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [timeoutDuraton, setTimeoutDuration] = useState(DEFAULT_TIMEOUT_DURATION);

  const handleChangeNotification = (options: TNotification) => {
    const {
      text,
      severity = 'success',
      variant = 'outlined',
      hideDuration = timeoutDuraton,
    } = options;
    setNotification({ text, severity, variant, hideDuration });
    setIsOpen(true);
  };

  useEffect(() => {
    let timeoutId: number | undefined;
    if (isOpen) {
      timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, timeoutDuraton);
    }

    return () => {
      if (timeoutId) return clearTimeout(timeoutId);
    };
  }, [isOpen, timeoutDuraton]);

  return (
    <NotificationContext.Provider
      value={{
        handleChangeNotification,
        isOpen,
        notification,
        setTimeoutDuration,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
export default NotificationContextProvider;

export const useNotificationContext = getSafeContext(NotificationContext, 'NotificationContext');
