import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './customDatePickerStyles.css';
import { pl } from 'date-fns/locale';

type OneMonthProps = {
  title: string;
  monthIndex: number;
};

const firstDayOfWeek = 0;
const lastDayOfWeek = 6;

const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === firstDayOfWeek || day === lastDayOfWeek;
};

const weekendClass = (date: Date) => (isWeekend(date) ? 'weekend' : '');

export const OneMonth = ({ title, monthIndex }: OneMonthProps) => {
  const today = new Date();
  const thisYear = today.getUTCFullYear();
  const startOfTheMonthDay = 1;
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(thisYear, monthIndex, startOfTheMonthDay),
  );
  const [endDate, setEndDate] = useState<Date | null>(null);

  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <DatePicker
      inline
      selectsRange
      dayClassName={weekendClass}
      disabled={true}
      endDate={endDate}
      locale={pl}
      selected={startDate}
      startDate={startDate}
      onChange={onChange}
    />
  );
};
