import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from '../../contexts/UserContext';

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
