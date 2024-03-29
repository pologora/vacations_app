export type TUser = {
  name: string;
  surname: string;
  id: string;
  role: string;
  employeeId: string;
  email: string;
  vacationDaysPerYear: number;
};

export type UserSignupData = {
  name: string;
  surname: string;
  employeeId: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type TEmployee = {
  _id: string;
  name: string;
  surname: string;
  email: string;
  pin: number;
  vacationDaysPerYear: number;
  agency?: string;
  userId: string;
};

export type TVacation = {
  _id: string;
  employeeId: string;
  type: string;
  duration: number;
  created_at: string;
  startVacation: string;
  endVacation: string;
  name: string;
  surname: string;
};

export type CalendarEvent = {
  start: string;
  end?: string;
  backgroundColor: string;
  allDay: boolean;
  title: string;
  type: 'holiday' | 'vacation' | 'proposal';
  id?: string;
};

export type vacationsProposalsStatusTypes = 'pending' | 'approved' | 'rejected';

export type TProposal = {
  _id: string;
  employeeId: string;
  type: string;
  duration: number;
  created_at: string;
  startVacation: string;
  endVacation: string;
  name: string;
  surname: string;
  status: vacationsProposalsStatusTypes;
  description?: string;
};

export type TNotification = {
  text: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
  variant?: 'filled' | 'outlined';
  hideDuration?: number;
};
