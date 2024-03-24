import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useUserContext();
  if (!user) {
    return <Navigate replace to={'/signin'} />;
  }
  return children;
};
