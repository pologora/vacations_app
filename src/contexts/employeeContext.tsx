import { ReactNode, createContext, useEffect, useState } from 'react';
import { TEmployee } from '../types/customTypes';
import { getSafeContext } from './getSafeContext';
import Cookies from 'js-cookie';

type EmployeeContextProps = {
  employee: TEmployee | null;
  saveEmployee: (value: TEmployee) => void;
};

type EmployeeContextProviderProps = {
  children: ReactNode;
};

const EmployeeContext = createContext<EmployeeContextProps | null>(null);

export const EmployeeContextProvider = ({ children }: EmployeeContextProviderProps) => {
  const [employee, setEmployee] = useState<TEmployee | null>(() => {
    const cookieEmployee = Cookies.get('employee');
    return cookieEmployee ? JSON.parse(cookieEmployee) : null;
  });

  const saveEmployee = (employee: TEmployee) => setEmployee(employee);

  useEffect(() => {
    if (employee) {
      Cookies.set('employee', JSON.stringify(employee), { expires: 365 });
    } else {
      Cookies.remove('employee');
    }
  }, [employee]);

  return (
    <EmployeeContext.Provider value={{ employee, saveEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = getSafeContext(EmployeeContext, 'Employee context');
