import { useEffect, useState } from 'react';
import { getAllVacationsByEmployeeId } from '../../Api/vacationServices';
import { useUserContext } from '../../contexts/userContext';
import style from './Home.module.css';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../Loading/Loading';
import { Calendar } from '../Calendar/Calendar';
import type { CalendarEvent } from '../../types/customTypes';
import { createCalendarVacationsEvents } from '../../helpers/createCalendarVacationsEvents';
import { getAllProposalsByEmployeeId } from '../../Api/proposalServices';
import { getEmployeeById } from '../../Api/employeeServices';
import { useEmployeeContext } from '../../contexts/employeeContext';
import { useNotificationContext } from '../../contexts/notificationContext';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const { user, signOut } = useUserContext();
  const [eventsList, setEventsList] = useState<CalendarEvent[]>([]);
  const { employee, saveEmployee } = useEmployeeContext();
  const { handleChangeNotification } = useNotificationContext();
  const navigate = useNavigate();

  if (!user) {
    navigate('/signin');
  }

  const {
    data: vacationsData,
    isLoading: vacationsIsLoading,
    isError: vacationsIsError,
    error: vacationsError,
  } = useQuery({
    queryFn: () => {
      if (user) return getAllVacationsByEmployeeId(user.employeeId);
    },
    queryKey: ['vacations', user!.employeeId],
  });

  const {
    data: proposalsData,
    isLoading: proposalIsLoading,
    isError: proposalIsError,
    error: proposalError,
  } = useQuery({
    queryFn: () => {
      if (user) {
        const id = user.employeeId;
        const url = `/proposals?employeeId=${id}&thisYear=true&status=pending`;
        return getAllProposalsByEmployeeId(url);
      }
    },
    queryKey: ['proposals', user!.employeeId],
  });

  const {
    data: employeeData,
    isLoading: employeeIsLoading,
    isError: employeeIsError,
  } = useQuery({
    queryFn: () => {
      if (user) return getEmployeeById(user.employeeId);
    },
    queryKey: ['employee'],
  });

  useEffect(() => {
    if (vacationsData) {
      const events = createCalendarVacationsEvents(vacationsData.data, proposalsData?.data);
      setEventsList(events);
    }
  }, [vacationsData, proposalsData]);

  useEffect(() => {
    if (employeeData) {
      saveEmployee(employeeData.data);
    }
  }, [employeeData]);

  if (vacationsIsLoading || proposalIsLoading || employeeIsLoading) {
    return <Loading />;
  }

  if (vacationsIsError || proposalIsError || employeeIsError) {
    handleChangeNotification({
      text: 'Coś poszło nie tak. Spróbuj załogować się ponownie.',
      severity: 'error',
    });
    const timeout = 2000;
    setTimeout(() => {
      signOut();
    }, timeout);

    return <div>{vacationsError?.message || proposalError?.message}</div>;
  }
  const allVacationsDuration = vacationsData?.data.reduce((acc, item) => {
    if (item.type === 'Wypoczynkowy') {
      return acc + item.duration;
    }
    return acc;
    // eslint-disable-next-line no-magic-numbers
  }, 0);

  const allProposalsDuration = proposalsData?.data.reduce((acc, item) => {
    if (item.type === 'Wypoczynkowy') {
      return acc + item.duration;
    }
    return acc;
    // eslint-disable-next-line no-magic-numbers
  }, 0);

  return (
    <div className={style.container}>
      <h2>{`${employee?.name} ${employee?.surname}`}</h2>
      <Typography>
        Liczba przysługujących dni urlopu wypoczynkowego: {employee?.vacationDaysPerYear}
      </Typography>
      <Typography>Potwierdzone dni: {allVacationsDuration}</Typography>
      <Typography>Oczekujące na potwierdzenie: {allProposalsDuration}</Typography>
      {vacationsData && <Calendar calendarEventsList={eventsList} />}
    </div>
  );
};
