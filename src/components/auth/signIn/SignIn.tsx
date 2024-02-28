import { Form, Formik } from 'formik';
import singInValidationSchema, {
  SignInFormValues,
} from '../../../yupValidationSchemas/signInValidationSchema';
import FormInput from '../../ui/FormElements/FormInput';
import { Loading } from '../../Loading/Loading';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import style from './SignIn.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../Api/authServices';
import { useUserContext } from '../../../contexts/userContext';
import { getAxiosErrorMessage } from '../../../helpers/errors/axiosErrors';
import { useNotificationContext } from '../../../contexts/notificationContext';
import { useMutation } from '@tanstack/react-query';

const initialValues = {
  email: '',
  password: '',
};

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useUserContext();
  const navigate = useNavigate();
  const { handleChangeNotification } = useNotificationContext();

  const loginMutation = useMutation({
    mutationFn: async (values: SignInFormValues) => {
      return await login(values.email, values.password);
    },
    onError: (error) => {
      const message = getAxiosErrorMessage(error);
      handleChangeNotification({
        text: message,
        severity: 'error',
      });
    },
    onSuccess: ({ data }) => {
      handleChangeNotification({
        text: 'Załogowałeś się',
        severity: 'success',
      });
      signIn(data);
      navigate('/');
    },
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={singInValidationSchema}
      onSubmit={async (values) => {
        try {
          setIsLoading(true);
          loginMutation.mutate(values);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <div className={style.container}>
        <Form className={style.form}>
          <FormInput autoComplete='email' label='E-mail' name='email' type='email' />
          <FormInput
            autoComplete='current-password'
            label='Hasło'
            name='password'
            type='password'
          />
          <Link className={style.resetLink} to={'/forgotPassword'}>
            <Typography component='p' variant='subtitle2'>
              Zapomniałeś hasło?
            </Typography>
          </Link>

          {isLoading ? (
            <Loading />
          ) : (
            <Button sx={{ marginTop: '2rem' }} type='submit' variant='contained'>
              Zaloguj się
            </Button>
          )}
        </Form>
      </div>
    </Formik>
  );
};
