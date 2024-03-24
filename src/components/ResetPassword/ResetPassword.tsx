import { useNavigate, useParams } from 'react-router-dom';
import { getAxiosErrorMessage } from '../../helpers/errors/axiosErrors';
import { resetPassword } from '../../Api/authServices';
import { useMutation } from '@tanstack/react-query';
import { useNotificationContext } from '../../contexts/NotificationContext';
import resetPasswordValidationSchema, {
  ResetPasswordFormValues,
} from '../../yupValidationSchemas/resetPasswordShema';
import { Form, Formik } from 'formik';
import FormInput from '../ui/FormElements/FormInput';
import { Button } from '@mui/material';
import style from './ResetPassword.module.css';

const initialValues = {
  password: '',
  confirmPassword: '',
};

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  if (!token) {
    return <div className='error'>Coś poszło nie tak</div>;
  }

  const { handleChangeNotification } = useNotificationContext();

  const resetPasswordMutation = useMutation({
    mutationFn: (values: ResetPasswordFormValues) => {
      return resetPassword(values, token);
    },
    onError: (error) => {
      const message = getAxiosErrorMessage(error);
      handleChangeNotification({
        text: message,
        severity: 'error',
      });
    },
    onSuccess: () => {
      handleChangeNotification({
        text: 'Hasło zostało zmienione, możesz się załogować',
        severity: 'success',
      });
      navigate('/signin');
    },
  });

  const handleResetPassword = (values: ResetPasswordFormValues) => {
    resetPasswordMutation.mutate(values);
  };

  return (
    <div className={style.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={resetPasswordValidationSchema}
        onSubmit={(values: ResetPasswordFormValues, helpers) => {
          handleResetPassword(values);
          helpers.resetForm();
        }}
      >
        <Form className={style.resetPasswordForm}>
          <FormInput autoComplete='new-password' label='Hasło' name='password' type='password' />
          <FormInput
            autoComplete='new-password'
            label='Potwierdź hasło'
            name='confirmPassword'
            type='password'
          />
          <Button
            color='info'
            sx={{ marginTop: '1rem', textAlign: 'right' }}
            type='submit'
            variant='contained'
          >
            Zmień hasło
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
