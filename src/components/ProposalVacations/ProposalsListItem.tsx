import { IconButton, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import { TProposal } from '../../types/customTypes';
import style from './ProposalVacations.module.css';
import SettingsIcon from '@mui/icons-material/Settings';
import { vacationsTypes } from '../../setup/constants';
import { useNavigate } from 'react-router-dom';
import { getDayStringFromUtcFullDate, getProposalStatus } from './helpers/helplers';

type ProposalsListItemProps = {
  proposalData: TProposal;
};

export const ProposalsListItem = ({ proposalData }: ProposalsListItemProps) => {
  const navigate = useNavigate();
  const { duration, endVacation, startVacation, type, _id: id, created_at, status } = proposalData;

  const proposalCreatedTime = getDayStringFromUtcFullDate(created_at);
  const proposalStartDay = getDayStringFromUtcFullDate(startVacation);
  const proposalEndDay = getDayStringFromUtcFullDate(endVacation);

  const { color, title } = getProposalStatus(status);

  const isLargeScreen = useMediaQuery('(min-width:600px)');

  const handleSettingsClick = () => {
    const url = `/proposals/${id}`;
    navigate(url);
  };

  const itemTypeText = isLargeScreen
    ? type
    : vacationsTypes.find((item) => item.label === type)?.short;

  return (
    <ListItem
      className={style.proposalsListItem}
      secondaryAction={
        <IconButton
          aria-label='settings'
          disabled={status === 'approved'}
          edge='end'
          onClick={handleSettingsClick}
        >
          <SettingsIcon color='secondary' />
        </IconButton>
      }
    >
      <ListItemText
        className={style.itemText}
        primary={isLargeScreen && proposalCreatedTime}
        secondary={itemTypeText}
        sx={{ color: color, width: '20%' }}
      />
      <ListItemText
        secondary={`${duration} dni`}
        primary={
          isLargeScreen ? (
            <div>
              {proposalStartDay} - {proposalEndDay}
            </div>
          ) : (
            <div>
              {proposalStartDay} - <br /> {proposalEndDay}
            </div>
          )
        }
      />
      {isLargeScreen && <ListItemText primary={title} sx={{ color: color }} />}
    </ListItem>
  );
};
