import { CalendarEvent } from '../../types/customTypes';
import { OneMonth } from './OneMonth';
import style from './Calendar.module.css';
import { months } from '../../setup/constants';

type CalendarProps = {
  calendarEventsList: CalendarEvent[];
};

export const Calendar = ({ calendarEventsList }: CalendarProps) => {
  const renderedMonths = months.map((month, index) => (
    <OneMonth
      key={month}
      calendarEventsList={calendarEventsList}
      monthIndex={index}
      title={month}
    />
  ));
  return <div className={style.calendarsListContainer}>{calendarEventsList && renderedMonths}</div>;
};
