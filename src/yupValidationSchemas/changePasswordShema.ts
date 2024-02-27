import * as yup from 'yup';

const minQuantityCharsForPassword = 8;

const schema = yup.object({
  currentPassword: yup.string().required('Hasło jest wymagane'),
  password: yup
    .string()
    .required('Hasło jest wymagane')
    .min(minQuantityCharsForPassword, 'Co najmniej 8 znaków'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Hasła muszą być zgodne')
    .required(),
});

export type ChangePasswordFormValues = yup.InferType<typeof schema>;
export default schema;
