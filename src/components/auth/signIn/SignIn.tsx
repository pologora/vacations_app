import { Form, Formik } from 'formik';
import singInValidationSchema from '../../../yupValidationSchemas/signInValidationSchema';
import FormInput from '../../ui/FormElements/FormInput';
import { Loading } from '../../Loading/Loading';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import style from './SignIn.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../Api/authServeces';
import { useUserContext } from '../../../contexts/userContext';

const initialValues = {
  email: '',
  password: '',
};

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useUserContext();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={singInValidationSchema}
      onSubmit={async ({ email, password }) => {
        setIsLoading(true);
        const { data } = await login(email, password);
        if (data.token) {
          signIn(data);
          navigate('/');
        }
        setIsLoading(false);
      }}
    >
      <div className={style.container}>
        <Form>
          <FormInput autoComplete='email' label='E-mail' name='email' type='email' />
          <FormInput
            autoComplete='current-password'
            label='Hasło'
            name='password'
            type='password'
          />
          <Link className={style.resetLink} to={'/reset'}>
            <Typography component='p' variant='subtitle2'>
              Forget password?
            </Typography>
          </Link>

          {isLoading ? (
            <Loading />
          ) : (
            <Button type='submit' variant='contained'>
              Zaloguj się
            </Button>
          )}
        </Form>
      </div>
    </Formik>
  );
};
