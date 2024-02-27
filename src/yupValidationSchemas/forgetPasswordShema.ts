import * as yup from 'yup';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const schema = yup.object({
  email: yup
    .string()
    .matches(emailRegex, 'Niepoprawny adres e-mail')
    .required('Adres e-mail jest wymagany'),
});

export type ForgetPasswordFormValues = yup.InferType<typeof schema>;
export default schema;
