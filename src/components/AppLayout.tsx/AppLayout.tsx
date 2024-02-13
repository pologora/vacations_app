import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../ResponsiveAppBar/ResponsiveAppBar';

export const AppLayout = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Outlet />
    </div>
  );
};
