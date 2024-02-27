import { Button, MenuItem, Typography } from '@mui/material';
import { vacationsTypes } from '../../setup/constants';
import { pl } from 'date-fns/locale';
import { Form, Formik } from 'formik';
import FormInput from '../ui/FormElements/FormInput';
import { useNavigate, useParams } from 'react-router-dom';
import proposalValidationSchema, {
  ProposalCreateValues,
  ProposalsFormValues,
} from '../../yupValidationSchemas/proposalValidationSchema';
import { FormSelect } from '../ui/FormElements/FormSelect';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calculateVacationDuration from '../../helpers/calculateVacationDuration';
import style from './ProposalVacations.module.css';
import { updateVacationProposal } from '../../Api/proposalServices';
import { convertTimePickerDateToIsoString } from '../../helpers/convertTimePickerDateToIsoString';
import { useNotificationContext } from '../../contexts/notificationContext';
import { useProposalsContext } from '../../contexts/proposalsContext';
import { BackButtonWithIcon } from '../ui/Buttons/BackButtonWithIcon';
import { useMutation } from '@tanstack/react-query';
import { TNotification, vacationsProposalsStatusTypes } from '../../types/customTypes';

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
  const { proposals } = useProposalsContext();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { handleChangeNotification } = useNotificationContext();

  const navigateBackIndex = -1;
  const handleBackButtonClick = () => navigate(navigateBackIndex);

  const proposal = proposals.find((item) => item._id === id);

  if (!proposal || !id) {
    return (
      <div>
        <BackButtonWithIcon onClick={handleBackButtonClick} />
        <Typography color={'red'}>Coś poszło nie tak</Typography>
      </div>
    );
  }

  const initialValues: ProposalsFormValues = {
    ...proposal,
    startVacation: new Date(proposal.startVacation),
    endVacation: new Date(proposal.endVacation),
  };

  const handleBackClick = () => {
    // eslint-disable-next-line no-magic-numbers
    navigate(-1);
  };

  const proposalUpdateMutation = useMutation({
    mutationFn: (values: ProposalCreateValues) => updateVacationProposal(id, values),
    onSuccess: async () => {
      const message = {
        text: 'Wniosek został złożony',
      };
      handleChangeNotification(message);
      navigate('/proposals');
    },
    onError: () => {
      const message: TNotification = {
        text: 'Nie udało się złożyć wniosku. Skontaktuj się z administratorem',
        severity: 'error',
      };
      handleChangeNotification(message);
    },
  });

  const updateProposal = async (values: ProposalsFormValues) => {
    const { endVacation, startVacation } = values;
    const endVacationConverted = convertTimePickerDateToIsoString(endVacation);
    const startVacationConverted = convertTimePickerDateToIsoString(startVacation);

    const status: vacationsProposalsStatusTypes = 'pending';

    const dataForPostRequest = {
      ...values,
      endVacation: endVacationConverted,
      startVacation: startVacationConverted,
      status: status,
    };
    proposalUpdateMutation.mutate(dataForPostRequest);
  };

  const handleAcceptClick = (values: ProposalsFormValues) => {
    updateProposal(values);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={proposalValidationSchema}
        onSubmit={async (values, helpers) => {
          await updateProposal(values);
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
                <Button type='submit' variant='contained' onClick={() => handleAcceptClick(values)}>
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
