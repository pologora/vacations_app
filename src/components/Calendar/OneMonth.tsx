import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import style from './Calendar.module.css';
import { CalendarEvent } from '../../types/customTypes';

type OneMonthProps = {
  title: string;
  monthIndex: number;
  calendarEventsList: CalendarEvent[];
};

export const OneMonth = ({ monthIndex, calendarEventsList }: OneMonthProps) => {
  const today = new Date();
  const thisYear = today.getFullYear();

  const firstDayOfMonth = 1;

  const desiredMonthDate = new Date(thisYear, monthIndex, firstDayOfMonth);

  const dayCellContent = ({ date, dayNumberText }: { date: Date; dayNumberText: number }) => {
    const firstDayOfWeek = 0;
    const lastDayOfWeek = 6;

    const day = date.getDay();
    if (day === firstDayOfWeek || day === lastDayOfWeek) {
      return <div style={{ color: 'red' }}>{dayNumberText}</div>;
    }
    return dayNumberText;
  };

  const handleEventClick = () => {};

  return (
    <div className={style.calendarContainer}>
      <FullCalendar
        eventResizableFromStart
        selectable
        contentHeight='auto'
        dayCellContent={dayCellContent}
        editable={false}
        eventClick={handleEventClick}
        events={calendarEventsList}
        firstDay={1}
        headerToolbar={{ left: '', right: '', center: 'title' }}
        initialDate={desiredMonthDate}
        initialView='dayGridMonth'
        locale='pl'
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        showNonCurrentDates={false}
        buttonText={{
          today: 'dziś',
        }}
      />
    </div>
  );
};
