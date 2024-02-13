/* eslint-disable no-console */
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeById } from '../../../Api/employeeServices';
import { useEffect, useState } from 'react';
import { TEmployee } from '../../../types/customTypes';
import { SignUpForm } from '../../SignUpForm/SignUpForm';
import { Loading } from '../../Loading/Loading';
import { getUserByEmployeeId } from '../../../Api/userServices';
import style from './SignUp.module.css';
import { Typography } from '@mui/material';

export const SignUp = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState<TEmployee | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const checkIfUserAlreadyExist = async (id: string) => {
    try {
      setIsLoading(true);
      const { data } = await getUserByEmployeeId(id);
      // eslint-disable-next-line no-magic-numbers
      if (data.length > 0) {
        const navigateToSignInTimeout = 1500;
        setError('Użytkownik już jest zarejestrowany');
        setTimeout(() => {
          navigate('/signin');
        }, navigateToSignInTimeout);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        setError(error.message);
      } else {
        console.error('An unknown error occurred:', error);
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getEmployee = async (id: string) => {
    try {
      setIsLoading(true);
      const { data } = await getEmployeeById(id);
      const { name, surname, _id: employeeId, email } = data;

      setEmployee({ name, surname, employeeId, email });
    } catch (error) {
      setError('Nie udało się pobrać dane, spróbuj później');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (employeeId) {
      checkIfUserAlreadyExist(employeeId);
      getEmployee(employeeId);
    }
  }, [employeeId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Typography>Imię: {employee?.name}</Typography>
      <Typography>Nazwisko: {employee?.surname}</Typography>
      <Typography>E-mail: {employee?.email}</Typography>
      <div className={style.formContainer}>{employee && <SignUpForm employee={employee} />}</div>
    </div>
  );
};
