import { useEffect } from 'react';
import { getAllVacationsByEmployeeId } from '../../Api/vacationServeces';
import { useUserContext } from '../../contexts/userContext';
import style from './Home.module.css';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../Loading/Loading';
import { Calendar } from '../Calendar/Calendar';

export const Home = () => {
  const { user, checkExpired } = useUserContext();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => {
      if (user) return getAllVacationsByEmployeeId(user.employeeId, user.token);
    },
    queryKey: ['vacations', user!.employeeId],
  });

  useEffect(() => {
    if (user) {
      checkExpired();
    }
  }, [user, checkExpired, data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return <div className={style.container}>{data && <Calendar data={data.data} />}</div>;
};
