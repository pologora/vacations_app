import { Form, Formik } from 'formik';
import FormInput from '../ui/FormElements/FormInput';
import forgetPasswordValidationSchema, {
  ForgetPasswordFormValues,
} from '../../yupValidationSchemas/forgetPasswordShema';
import style from './ForgotPassword.module.css';
import { Button } from '@mui/material';
import { useNotificationContext } from '../../contexts/notificationContext';
import { forgotPassword } from '../../Api/authServices';
import { TNotification } from '../../types/customTypes';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  email: '',
};

export const ForgotPassword = () => {
  const { handleChangeNotification } = useNotificationContext();
  const navigate = useNavigate();

  const succesMessage: TNotification = {
    text: 'Link został wysłany na wskazany email',
  };

  return (
    <div className={style.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={forgetPasswordValidationSchema}
        onSubmit={async (values: ForgetPasswordFormValues, helpers) => {
          try {
            await forgotPassword(values);
            handleChangeNotification(succesMessage);
            helpers.resetForm();
            navigate('/login');
          } catch (error) {
            // @ts-expect-error errors
            const message = error?.response?.data?.message || 'Coś poszło nie tak';
            handleChangeNotification({ text: message, severity: 'error' });
          }
        }}
      >
        <Form className={style.form}>
          <FormInput label='Email' name='email' />
          <Button color='secondary' type='submit' variant='outlined'>
            Zresetuj hasło
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
