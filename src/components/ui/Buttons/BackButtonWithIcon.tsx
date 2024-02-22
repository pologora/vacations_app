import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type BackButtonWithIconProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const BackButtonWithIcon = ({ onClick }: BackButtonWithIconProps) => {
  return (
    <Button startIcon={<ArrowBackIcon />} variant='text' onClick={onClick}>
      Wstecz
    </Button>
  );
};
