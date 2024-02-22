import * as yup from 'yup';

const minDaysVacation = 1;

const schema = yup.object({
  employeeId: yup.string().required(),
  type: yup.string().required(),
  duration: yup.number().required().min(minDaysVacation),
  startVacation: yup.date().required(),
  endVacation: yup.date().required(),
  name: yup.string().required(),
  surname: yup.string().required(),
  status: yup.string().required().oneOf(['pending']),
  description: yup.string().when('type', {
    is: 'inne',
    then: (value) => value.required('Opis jest wymagany dla typu "inne"'),
    otherwise: (value) => value.notRequired(), // Ensure it's not required for other types
  }),
});

export type ProposalsFormValues = yup.InferType<typeof schema>;
export type ProposalCreateValues = Omit<ProposalsFormValues, 'startVacation' | 'endVacation'> & {
  startVacation: string;
  endVacation: string;
};
export default schema;
