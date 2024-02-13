import { TVacation } from '../../types/customTypes';
import { OneMonth } from './OneMonth';

const months = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];

type CalendarProps = {
  data: TVacation[];
};

export const Calendar = ({ data }: CalendarProps) => {
  const renderedMonths = months.map((month, index) => (
    <OneMonth key={month} monthIndex={index} title={month} />
  ));
  return <div>{renderedMonths}</div>;
};
