import { Button } from '@mui/material';
import { useUserContext } from '../../contexts/UserContext';
import style from './Account.module.css';
import { Form, Formik } from 'formik';
import FormInput from '../ui/FormElements/FormInput';
import changePasswordValidationSchema, {
  ChangePasswordFormValues,
} from '../../yupValidationSchemas/changePasswordShema';
import { ProposalInfoProperty } from '../ProposalVacations/ProposalInfoProperty';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../../Api/authServices';
import { useNotificationContext } from '../../contexts/NotificationContext';
import { getAxiosErrorMessage } from '../../helpers/errors/axiosErrors';
import { useEmployeeContext } from '../../contexts/EmployeeContext';

const initialValues: ChangePasswordFormValues = {
  currentPassword: '',
  password: '',
  confirmPassword: '',
};

export const Account = () => {
  const { user } = useUserContext();
  const { employee } = useEmployeeContext();
  const { handleChangeNotification } = useNotificationContext();

  const changePasswordMutation = useMutation({
    mutationFn: (values: ChangePasswordFormValues) => {
      return changePassword(values);
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
        text: 'Hasło zostało zmienione',
        severity: 'success',
      });
    },
  });

  const handleChangePassword = (values: ChangePasswordFormValues) => {
    changePasswordMutation.mutate(values);
  };

  return (
    <div className={style.container}>
      <div className={style.infoContainer}>
        <ProposalInfoProperty label='Imię' value={user?.name} />
        <ProposalInfoProperty label='Nazwisko' value={user?.surname} />
        <ProposalInfoProperty label='Email' value={user?.email} />
        <ProposalInfoProperty
          label='Urlop wypoczynkowy'
          value={
            employee?.vacationDaysPerYear
              ? `${employee?.vacationDaysPerYear?.toString()} dni`
              : undefined
          }
        />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={changePasswordValidationSchema}
        onSubmit={(values: ChangePasswordFormValues, helpers) => {
          handleChangePassword(values);
          helpers.resetForm();
        }}
      >
        <Form className={style.changePasswordForm}>
          <FormInput
            autoComplete='current-password'
            label='Aktualne hasło'
            name='currentPassword'
            type='password'
          />
          <FormInput
            autoComplete='new-password'
            label='Nowe hasło'
            name='password'
            type='password'
          />
          <FormInput
            autoComplete='new-password'
            label='Potwierdź nowe hasło'
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
      <div className={style.buttonsContainer}>
        <Button disabled color='error' variant='contained'>
          Usuń konto
        </Button>
      </div>
    </div>
  );
};
