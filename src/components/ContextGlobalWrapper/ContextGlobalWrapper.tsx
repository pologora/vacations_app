import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from '../../contexts/userContext';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProposalsContextProvider } from '../../contexts/proposalsContext';

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
            <UserContextProvider>{children}</UserContextProvider>
          </ProposalsContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
};
