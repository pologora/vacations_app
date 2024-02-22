import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../ResponsiveAppBar/ResponsiveAppBar';
import style from './AppLayout.module.css';
import { Container } from '@mui/material';

export const AppLayout = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Container className={style.container} maxWidth='xl'>
        <Outlet />
      </Container>
    </div>
  );
};
