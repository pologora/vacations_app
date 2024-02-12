export type TUser = {
  name: string;
  surname: string;
  id: string;
  role: string;
  employeeId: string;
  email: string;
  token: string;
};

export type UserCreationType = {
  name: string;
  surname: string;
  employeeId: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type EmployeeType = {
  name: string;
  surname: string;
  email: string;
  employeeId: string;
};
