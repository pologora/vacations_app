import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type BooleanAlertProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onAccept: () => void;
  title: string;
  content: string;
  acceptText: string;
  color?: 'primary' | 'secondary' | 'inherit' | 'success' | 'error' | 'info' | 'warning';
};

export const BooleanAlert = ({
  open,
  setOpen,
  onAccept,
  title,
  content,
  acceptText,
  color = 'primary',
}: BooleanAlertProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    onAccept();
    handleClose();
  };

  return (
    <Dialog
      aria-describedby='alert-dialog-description'
      aria-labelledby='alert-dialog-title'
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>powrót</Button>
        <Button color={color} variant='contained' onClick={handleAgree}>
          {acceptText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
