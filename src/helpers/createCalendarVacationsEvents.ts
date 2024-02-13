import { CalendarEvent, TProposal, TVacation } from '../types/customTypes';
import { vacationsTypes } from '../setup/constants';
import createEventHolidaysList from './createAnEventHolidaysList';

export function createCalendarVacationsEvents(
  vacations: TVacation[],
  proposals: TProposal[] = [],
): CalendarEvent[] {
  const holidaysEventList = createEventHolidaysList();

  const vacationsEvents: CalendarEvent[] = vacations.map((vacation) => {
    const notDefinedType = vacationsTypes.find((type) => type.label === 'inne');
    const type = vacationsTypes.find((type) => type.label === vacation.type) || notDefinedType;

    const date = new Date(vacation.endVacation);
    const oneDay = 1;
    date.setDate(date.getDate() + oneDay);
    const endPlusDay = date.toISOString();

    return {
      start: vacation.startVacation,
      end: endPlusDay,
      backgroundColor: type!.color,
      allDay: true,
      title: `${type!.short}-${vacation.duration}`,
      type: 'vacation',
      id: vacation._id,
    };
  });

  const proposalsEvents: CalendarEvent[] = proposals.map((proposal) => {
    return {
      start: proposal.startVacation,
      end: proposal.endVacation,
      allDay: true,
      title: proposal.duration.toString(),
      type: 'proposal',
      id: proposal._id,
      backgroundColor: '#808080',
    };
  });

  return [...vacationsEvents, ...holidaysEventList, ...proposalsEvents];
}
