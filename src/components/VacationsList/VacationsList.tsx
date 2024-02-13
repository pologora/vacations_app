import { TVacation } from '../../types/customTypes';
import { VacationListItem } from './VacationListItem';

type VacationsListProps = {
  data: TVacation[];
};

export const VacationsList = ({ data }: VacationsListProps) => {
  return (
    <div>
      {data.map((vacation) => (
        <VacationListItem key={vacation.created_at} data={vacation} />
      ))}
    </div>
  );
};
