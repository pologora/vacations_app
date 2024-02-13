import { Button, Container, Typography } from '@mui/material';
import { useUserContext } from '../../contexts/userContext';
import style from './Account.module.css';

export const Account = () => {
  const { user } = useUserContext();
  return (
    <Container>
      <div className={style.container}>
        <Typography variant='h6'>Imię:</Typography>
        <Typography component='span'>{user?.name}</Typography>
        <Typography variant='h6'>Nazwisko:</Typography>
        <Typography component='span'>{user?.surname}</Typography>
        <Typography variant='h6'>E-mail:</Typography>
        <Typography component='span'>{user?.email}</Typography>
        <div className={style.buttonsContainer}>
          <Button color='error' variant='contained'>
            Usuń konto
          </Button>
          <Button color='info' variant='contained'>
            Zmień hasło
          </Button>
        </div>
      </div>
    </Container>
  );
};
