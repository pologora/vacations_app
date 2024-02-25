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

export const Home = () => {
  const { user, signOut } = useUserContext();
  const [eventsList, setEventsList] = useState<CalendarEvent[]>([]);

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
        const url = `/proposals?employeId=${id}&thisYear=true&status=pending`;
        return getAllProposalsByEmployeeId(url);
      }
    },
    queryKey: ['proposals', user!.employeeId],
  });

  useEffect(() => {
    if (vacationsData) {
      const events = createCalendarVacationsEvents(vacationsData.data, proposalsData?.data);
      setEventsList(events);
    }
  }, [vacationsData, proposalsData]);

  if (vacationsIsLoading || proposalIsLoading) {
    return <Loading />;
  }

  if (vacationsIsError || proposalIsError) {
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
      {vacationsData && <Calendar calendarEventsList={eventsList} />}
    </div>
  );
};
