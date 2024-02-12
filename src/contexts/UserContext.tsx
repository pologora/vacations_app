import { createContext, useState } from 'react';
import { TUser } from '../types/customTypes';
import { getSafeContext } from './getSafeContext';

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
  const [user, setUser] = useState<TUser | null>(null);

  const signIn = (user: TUser) => {
    setUser(user);
  };
  const signOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = getSafeContext(UserContext, 'UserContext');
