import { TextField } from '@mui/material';
import { Field, FieldAttributes, useField } from 'formik';
import { ReactNode } from 'react';

type FormSelectProps = {
  label: string;
  children: ReactNode;
} & FieldAttributes<object>;

export const FormSelect = ({ children, label, ...props }: FormSelectProps) => {
  const [field, meta] = useField(props);
  return (
    <Field
      select
      as={TextField}
      {...field}
      {...props}
      fullWidth
      defaultValue=''
      error={meta.touched && !!meta.error}
      helperText={meta.error}
      label={label}
    >
      {children}
    </Field>
  );
};
