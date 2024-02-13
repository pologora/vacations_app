import { Form, Formik } from 'formik';
import singUpValidationSchema from '../../yupValidationSchemas/userValidationSchema';
import { TEmployee, UserSignupData } from '../../types/customTypes';
import FormInput from '../ui/FormElements/FormInput';
import { Button } from '@mui/material';
import { useState } from 'react';
import { createUser, getUser } from '../../Api/userServices';
import { Loading } from '../Loading/Loading';
import { useUserContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import style from './SignUpForm.module.css';

const initialValues = {
  password: '',
  confirmPassword: '',
};

type SignUpFormProps = {
  employee: TEmployee;
};

export const SignUpForm = ({ employee }: SignUpFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useUserContext();
  const navigate = useNavigate();

  const createNewUser = async (newUser: UserSignupData) => {
    try {
      setIsLoading(true);
      const data = await createUser(newUser);
      return data.data.insertedId;
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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={singUpValidationSchema}
      onSubmit={async (values) => {
        const newUser = { ...values, ...employee };
        const newUserId = await createNewUser(newUser);

        if (newUserId) {
          const { data } = await getUser(newUserId);
          signIn(data);
          navigate('/');
        }
      }}
    >
      <Form className={style.container}>
        <FormInput
          label='Hasło'
          type='password'
          name='password'
          autoComplete='current-password'
        />
        <FormInput
          label='Potwierdź hasło'
          type='password'
          name='confirmPassword'
          autoComplete='current-password'
        />
        {isLoading ? (
          <Loading />
        ) : (
          <Button
            variant='contained'
            type='submit'
            sx={{
              marginTop: '2rem',
            }}
          >
            Zarejestruj się
          </Button>
        )}
      </Form>
    </Formik>
  );
};
