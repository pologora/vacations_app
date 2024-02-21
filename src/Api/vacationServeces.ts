/* eslint-disable no-console */
import axiosInstance from '../setup/axiosInstance';
import { TVacation } from '../types/customTypes';

type AllVacationsReturn = {
  status: string;
  data: TVacation[];
};

export const getAllVacationsByEmployeeId = async (id: string): Promise<AllVacationsReturn> => {
  const url = `/vacations?employeeId=${id}&thisYear=true`;

  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
