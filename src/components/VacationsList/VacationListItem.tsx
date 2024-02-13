import { Box, Typography } from '@mui/material';
import { TVacation } from '../../types/customTypes';
import style from './Vacations.module.css';

type VacationListItemProps = {
  data: TVacation;
};

export const VacationListItem = ({ data }: VacationListItemProps) => {
  return (
    <Box className={style.vacationListItemContainer}>
      <Typography variant='body1'>{data.duration}</Typography>
    </Box>
  );
};
