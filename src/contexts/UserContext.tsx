import { createContext, useEffect, useState } from 'react';
import { TUser } from '../types/customTypes';
import { getSafeContext } from './getSafeContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type UserContextProps = {
  user: TUser | null;
  signIn: (user: TUser) => void;
  signOut: () => void;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

const UserContext = createContext<UserContextProps | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<TUser | null>(() => {
    const cookieUser = Cookies.get('user');
    return cookieUser ? JSON.parse(cookieUser) : null;
  });
  const navigate = useNavigate();

  const navigateToLogin = () => navigate('/signin');

  const signIn = (user: TUser) => {
    setUser(user);
  };

  const signOut = () => {
    setUser(null);
    navigateToLogin();
  };

  useEffect(() => {
    if (user) {
      Cookies.set('user', JSON.stringify(user), { expires: 365 });
    } else {
      Cookies.remove('user');
    }
  }, [user]);

  return <UserContext.Provider value={{ user, signIn, signOut }}>{children}</UserContext.Provider>;
};

export const useUserContext = getSafeContext(UserContext, 'UserContext');
