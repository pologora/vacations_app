import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from '../../contexts/userContext';

type ContextGlobalWrapperProps = {
  children: React.ReactNode;
};

export const ContextGlobalWrapper = ({
  children,
}: ContextGlobalWrapperProps) => {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>{children}</UserContextProvider>
      </BrowserRouter>
    </>
  );
};
