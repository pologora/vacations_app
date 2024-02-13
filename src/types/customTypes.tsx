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
  employeeIs: string;
  type: string;
  duration: number;
  created_at: string;
  startVacation: string;
  endVacation: string;
  name: string;
  surname: string;
};
