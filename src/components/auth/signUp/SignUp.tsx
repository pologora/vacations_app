/* eslint-disable no-console */
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Loading } from '../../Loading/Loading';
import style from './SignUp.module.css';
import { Form, Formik } from 'formik';
import FormInput from '../../ui/FormElements/FormInput';
import sinupValidationSchema, {
  SignUpFormValidation,
} from '../../../yupValidationSchemas/signUpValidationSchema';
import { Button } from '@mui/material';
import { signUp } from '../../../Api/authServices';
import { useNotificationContext } from '../../../contexts/notificationContext';

const initialValues: SignUpFormValidation = { password: '', confirmPassword: '' };

export const SignUp = () => {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { handleChangeNotification } = useNotificationContext();

  const navigateToLoginPage = () => navigate('/signin');

  const registerNewUser = async (password: string, confirmPassword: string, token: string) => {
    try {
      setIsLoading(true);
      await signUp(token, password, confirmPassword);
      handleChangeNotification({ text: 'Rejestracja zakończyła się powodzeniem' });
      const timeout = 1500;
      setTimeout(() => {
        navigateToLoginPage();
      }, timeout);
    } catch (error) {
      // @ts-expect-error axios error response message
      const { message } = error.response.data;
      if (message) {
        setError(message);
      } else {
        setError('Coś poszło nie tak. Skontaktuj się z administratorem');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className={style.error}>{error}</div>;
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.formContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={sinupValidationSchema}
          onSubmit={async (values) => {
            if (token) {
              await registerNewUser(values.password, values.confirmPassword, token);
            } else {
              setError('Ten link jest nieprawidłowy');
            }
          }}
        >
          <Form>
            <FormInput
              autoComplete='new-password'
              label='Podaj hasło'
              name='password'
              type='password'
            />
            <FormInput
              autoComplete='new-password'
              label='Potwierdź hasło'
              name='confirmPassword'
              type='password'
            />
            <div className={style.buttonContainer}>
              <Button type='submit' variant='contained'>
                Zarejestruj się
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
