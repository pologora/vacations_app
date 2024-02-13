export type TUser = {
  name: string;
  surname: string;
  id: string;
  role: string;
  employeeId: string;
  email: string;
  token: string;
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
  name: string;
  surname: string;
  email: string;
  employeeId: string;
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
  status: 'pending' | 'approved' | 'rejected';
};
