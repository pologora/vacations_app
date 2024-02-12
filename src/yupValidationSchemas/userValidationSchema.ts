import * as yup from 'yup';

const minPasswordLength = 8;

const schema = yup.object({
  password: yup
    .string()
    .required()
    .min(minPasswordLength, 'Hasło piwinno zawierać co najmniej 8 znaków'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
});

export type SignUpFormValues = yup.InferType<typeof schema>;
export default schema;
