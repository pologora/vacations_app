import { TProposal } from '../../types/customTypes';
import { ProposalsListItem } from './ProposalsListItem';
import style from './ProposalVacations.module.css';

type ProposalsListProps = {
  proposalsData: TProposal[];
};

const noItemsInArrayLength = 0;

export const ProposalsList = ({ proposalsData }: ProposalsListProps) => {
  if (!proposalsData || proposalsData.length === noItemsInArrayLength) {
    return <div>Brak złożonych wniosków</div>;
  }

  const renderedProposalsItems = proposalsData.map((item) => (
    <ProposalsListItem key={item._id} proposalData={item} />
  ));
  return <div className={style.proposalsListContainer}>{renderedProposalsItems}</div>;
};
