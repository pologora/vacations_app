import { useEffect, useState } from 'react';
import { getAllVacationsByEmployeeId } from '../../Api/vacationServeces';
import { useUserContext } from '../../contexts/userContext';
import style from './Home.module.css';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../Loading/Loading';
import { Calendar } from '../Calendar/Calendar';
import type { CalendarEvent } from '../../types/customTypes';
import { createCalendarVacationsEvents } from '../../helpers/createCalendarVacationsEvents';

export const Home = () => {
  const { user } = useUserContext();
  const [eventsList, setEventsList] = useState<CalendarEvent[]>([]);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => {
      if (user) return getAllVacationsByEmployeeId(user.employeeId);
    },
    queryKey: ['vacations', user!.employeeId],
  });

  useEffect(() => {
    if (data) {
      const events = createCalendarVacationsEvents(data.data);

      setEventsList(events);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={style.container}>{data && <Calendar calendarEventsList={eventsList} />}</div>
  );
};
