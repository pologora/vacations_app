import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from '../../contexts/userContext';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProposalsContextProvider } from '../../contexts/proposalsContext';
import NotificationContextProvider from '../../contexts/notificationContext';
import { EmployeeContextProvider } from '../../contexts/employeeContext';

type ContextGlobalWrapperProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
});

export const ContextGlobalWrapper = ({ children }: ContextGlobalWrapperProps) => {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ProposalsContextProvider>
            <NotificationContextProvider>
              <EmployeeContextProvider>
                <UserContextProvider>{children}</UserContextProvider>
              </EmployeeContextProvider>
            </NotificationContextProvider>
          </ProposalsContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
};
