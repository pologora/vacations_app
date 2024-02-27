import { Button, MenuItem, Typography } from '@mui/material';
import { useUserContext } from '../../contexts/userContext';
import { vacationsTypes } from '../../setup/constants';
import { pl } from 'date-fns/locale';
import { Form, Formik } from 'formik';
import FormInput from '../ui/FormElements/FormInput';
import { useNavigate, useParams } from 'react-router-dom';
import proposalValidationSchema, {
  ProposalsFormValues,
} from '../../yupValidationSchemas/proposalValidationSchema';
import { FormSelect } from '../ui/FormElements/FormSelect';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calculateVacationDuration from '../../helpers/calculateVacationDuration';
import style from './ProposalVacations.module.css';
import { createVacationProposal } from '../../Api/proposalServices';
import { convertTimePickerDateToIsoString } from '../../helpers/convertTimePickerDateToIsoString';
import { useNotificationContext } from '../../contexts/notificationContext';

const firstDayOfTheWeek = 0;
const lastDayOfTheWeek = 6;

const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === firstDayOfTheWeek || day === lastDayOfTheWeek;
};

const weekendClass = (date: Date) => (isWeekend(date) ? 'weekend' : '');

const vacationsTypesList = vacationsTypes.map((item) => (
  <MenuItem key={item.label} value={item.label}>
    {item.label}
  </MenuItem>
));

const EditProposal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const navigator = useNavigate();
  const { handleChangeNotification } = useNotificationContext();

  if (!user) {
    navigator('/signin');
  }

  const initialValues: ProposalsFormValues = {
    name: user!.name,
    surname: user!.surname,
    duration: 0,
    employeeId: user!.employeeId,
    type: '',
    status: 'pending',
    startVacation: new Date(),
    endVacation: new Date(),
    description: '',
  };

  const handleBackClick = () => {
    // eslint-disable-next-line no-magic-numbers
    navigate(-1);
  };

  const createProposal = async (values: ProposalsFormValues) => {
    const { endVacation, startVacation } = values;
    const endVacationConverted = convertTimePickerDateToIsoString(endVacation);
    const startVacationConverted = convertTimePickerDateToIsoString(startVacation);

    const dataForPostRequest = {
      ...values,
      endVacation: endVacationConverted,
      startVacation: startVacationConverted,
    };

    const result = await createVacationProposal(dataForPostRequest);
    return result;
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={proposalValidationSchema}
        onSubmit={async (values, helpers) => {
          const result = await createProposal(values);
          if (result.status === 'success') {
            handleChangeNotification({ text: 'Wniosek został złożony' });
          }
          helpers.resetForm();
        }}
      >
        {({ values, setFieldValue }) => (
          <div className={style.proposalContainer}>
            <Form>
              <FormSelect label='Rodzaj wniosku' name='type'>
                {vacationsTypesList}
              </FormSelect>
              <FormInput label='Informacja dodatkowa / uwagi' name='description' />
              <div className={style.datePicker}>
                <ReactDatePicker
                  inline
                  selectsRange
                  dayClassName={weekendClass}
                  endDate={values.endVacation}
                  locale={pl}
                  startDate={values.startVacation}
                  onChange={(dates) => {
                    const firstArrIdx = 0;
                    const secondArrIdx = 1;

                    setFieldValue('startVacation', dates[firstArrIdx]);
                    setFieldValue('endVacation', dates[secondArrIdx]);
                    setFieldValue(
                      'duration',
                      calculateVacationDuration(dates[firstArrIdx], dates[secondArrIdx]),
                    );
                  }}
                />
              </div>
              <Typography fontWeight={700}>
                Wnioskowana liczba dni: <span>{values.duration}</span>
              </Typography>
              <Typography fontWeight={700}>
                {values.startVacation?.toLocaleDateString()}
                {' - '}
                {values.endVacation?.toLocaleDateString()}
              </Typography>
              <div className={style.buttonsContainer}>
                <Button sx={{ marginLeft: '1rem' }} variant='outlined' onClick={handleBackClick}>
                  Wstecz
                </Button>
                <Button type='submit' variant='contained'>
                  Wyślij wniosek
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};
export default EditProposal;
