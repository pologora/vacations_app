import { useNavigate, useParams } from 'react-router-dom';
import { useProposalsContext } from '../../contexts/proposalsContext';
import { Button, Typography } from '@mui/material';
import { BackButtonWithIcon } from '../ui/Buttons/BackButtonWithIcon';
import style from './ProposalVacations.module.css';
import { ProposalInfoProperty } from './ProposalInfoProperty';
import { getDayStringFromUtcFullDate, getProposalStatus } from './helpers/helplers';

export const ProposalInfo = () => {
  const { proposals } = useProposalsContext();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const navigateBackIndex = -1;
  const handleBackButtonClick = () => navigate(navigateBackIndex);

  const proposal = proposals.find((item) => item._id === id);

  if (!proposal) {
    return (
      <div>
        <BackButtonWithIcon onClick={handleBackButtonClick} />
        <Typography color={'red'}>Coś poszło nie tak</Typography>
      </div>
    );
  }

  const { color, fullTitle } = getProposalStatus(proposal?.status);
  const start = getDayStringFromUtcFullDate(proposal.startVacation);
  const end = getDayStringFromUtcFullDate(proposal.endVacation);
  const createdAt = getDayStringFromUtcFullDate(proposal.created_at);
  const isEditable = proposal.status === 'pending' || proposal.status === 'rejected';
  const isDeletable = proposal.status === 'pending';

  return (
    <div>
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
        <Button color='error' disabled={!isDeletable} variant='contained'>
          Anuluj wniosek
        </Button>
        <Button color='secondary' disabled={!isEditable} variant='outlined'>
          Edytuj
        </Button>
        <Button color='primary' variant='outlined' onClick={handleBackButtonClick}>
          Wstecz
        </Button>
      </div>
    </div>
  );
};
