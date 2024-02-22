import { Typography } from '@mui/material';
import style from './ProposalVacations.module.css';

type ProposalInfoPropertyProps = {
  label: string;
  value: string | undefined;
  color?: string;
};

export const ProposalInfoProperty = ({
  label,
  value = 'Nie podano',
  color,
}: ProposalInfoPropertyProps) => {
  return (
    <Typography className={style.property} color={color}>
      <Typography className={style.propertyLabel} component='span'>
        {label}
      </Typography>
      <Typography className={style.propertyValue} component='span' fontWeight={500}>
        {value}
      </Typography>
    </Typography>
  );
};
