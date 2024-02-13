import { Button } from '@mui/material';
import { useUserContext } from '../../contexts/userContext';

export const LogOutButton = () => {
  const { signOut } = useUserContext();

  return <Button onClick={() => signOut()}>Wyloguj się</Button>;
};
