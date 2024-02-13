import { useEffect } from 'react';
import { getAllVacationsByEmployeeId } from '../../Api/vacationServeces';
import { useUserContext } from '../../contexts/userContext';
import style from './Home.module.css';

export const Home = () => {
  const { user, checkExpired } = useUserContext();
  console.log(user);

  const getVacations = async (employeeId: string, token: string) => {
    const { data } = await getAllVacationsByEmployeeId(employeeId, token);
    console.log(data);
  };

  useEffect(() => {
    if (user) {
      checkExpired();
      getVacations(user.employeeId, user.token);
    }
  }, [user, checkExpired]);
  return <div className={style.container}>Home</div>;
};
