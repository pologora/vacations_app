import { useNavigate, useParams } from 'react-router-dom';
import { useProposalsContext } from '../../contexts/proposalsContext';
import { Button, Typography } from '@mui/material';
import { BackButtonWithIcon } from '../ui/Buttons/BackButtonWithIcon';
import style from './ProposalVacations.module.css';
import { ProposalInfoProperty } from './ProposalInfoProperty';
import { getDayStringFromUtcFullDate, getProposalStatus } from './helpers/helplers';
import { useNotificationContext } from '../../contexts/notificationContext';
import { useMutation } from '@tanstack/react-query';
import { deleteVacationProposal } from '../../Api/proposalServices';
import { TNotification } from '../../types/customTypes';
import { useState } from 'react';
import { BooleanAlert } from '../BooleanAlert/BooleanAlert';

export const ProposalInfo = () => {
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
  const { handleChangeNotification } = useNotificationContext();
  const { proposals } = useProposalsContext();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const navigateBackIndex = -1;
  const handleBackButtonClick = () => navigate(navigateBackIndex);

  const proposal = proposals.find((item) => item._id === id);

  if (!proposal || !id) {
    return (
      <div>
        <BackButtonWithIcon onClick={handleBackButtonClick} />
        <Typography color={'red'}>Coś poszło nie tak</Typography>
      </div>
    );
  }

  const proposalDeleteMutation = useMutation({
    mutationFn: (id: string) => deleteVacationProposal(id),
    onSuccess: async () => {
      const message = {
        text: 'Wniosek został anulowany',
      };
      handleChangeNotification(message);
      navigate('/proposals');
    },
    onError: () => {
      const message: TNotification = {
        text: 'Nie udało się anulować wniosku. Skontaktuj się z administratorem.',
        severity: 'error',
      };
      handleChangeNotification(message);
    },
  });

  const handleDeleteProposal = () => {
    proposalDeleteMutation.mutate(id);
  };

  const handleEditClick = () => {
    navigate(`/proposals/${id}/edit`);
  };

  const handleDeleteClick = () => {
    setIsOpenDeleteAlert(true);
  };

  const { color, fullTitle } = getProposalStatus(proposal?.status);
  const start = getDayStringFromUtcFullDate(proposal.startVacation);
  const end = getDayStringFromUtcFullDate(proposal.endVacation);
  const createdAt = getDayStringFromUtcFullDate(proposal.created_at);
  const isEditable = proposal.status === 'pending' || proposal.status === 'rejected';
  const isDeletable = proposal.status === 'pending';

  return (
    <div>
      {isOpenDeleteAlert && (
        <BooleanAlert
          acceptText='usuń'
          color='error'
          content='Czy napewno chcesz usunąć wniosek?'
          open={isOpenDeleteAlert}
          setOpen={setIsOpenDeleteAlert}
          title='Usunięcie wniosku'
          onAccept={handleDeleteProposal}
        />
      )}
      <BackButtonWithIcon onClick={handleBackButtonClick} />
      <div className={style.proposalInfoContainer}>
        <ProposalInfoProperty
          label='Imię i nazwisko'
          value={`${proposal?.name} ${proposal?.surname}`}
        />
        <ProposalInfoProperty label='Rodzaj wniosku' value={proposal.type} />
        <ProposalInfoProperty label='Data urlopu/nieobecności' value={`${start} - ${end}`} />
        <ProposalInfoProperty label='Rodzaj wniosku' value={proposal?.type} />
        <ProposalInfoProperty color={color} label='Status' value={fullTitle} />
        <ProposalInfoProperty label='Złożony' value={createdAt} />
      </div>
      <div className={style.proposalInfoButtonsContainer}>
        <Button
          color='error'
          disabled={!isDeletable}
          variant='contained'
          onClick={handleDeleteClick}
        >
          Anuluj wniosek
        </Button>
        <Button
          color='secondary'
          disabled={!isEditable}
          variant='outlined'
          onClick={handleEditClick}
        >
          Edytuj
        </Button>
        <Button color='primary' variant='outlined' onClick={handleBackButtonClick}>
          Wstecz
        </Button>
      </div>
    </div>
  );
};
