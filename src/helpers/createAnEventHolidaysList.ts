import { CalendarEvent } from '../types/customTypes';
import calculateHolidays from './calculateHolidays';

const holidaysTitles = [
  { title: 'Nowy Rok' }, // New Year's Day
  { title: 'Święto Trzech Króli' }, // Epiphany
  { title: 'Święto Pracy' }, // Labor Day
  { title: 'Święto Narodowe Trzeciego Maja' }, // Constitution Day
  { title: 'Wniebowzięcie Najświętszej Maryi Panny' }, // Assumption of the Blessed Virgin Mary
  { title: 'Wszystkich Świętych' }, // All Saints' Day
  { title: 'Święto Niepodległości' }, // Independence Day
  { title: 'Pierwszy dzień Bożego Narodzenia' }, // Christmas Day
  { title: 'Drugi dzień Bożego Narodzenia' }, // Second Day of Christmas
  { title: 'Wielkanoc' }, // Easter
  { title: 'Poniedziałek Wielkanocny' }, // Easter Monday
];

export default function createEventHolidaysList() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const holidaysList = calculateHolidays(currentYear);

  const eventList: CalendarEvent[] = holidaysList.map((holidayDate, index) => {
    return {
      start: `${currentYear.toString()}-${holidayDate}`,
      backgroundColor: '#FF0000',
      allDay: true,
      title: holidaysTitles[index].title,
      type: 'holiday',
    };
  });
  return eventList;
}
