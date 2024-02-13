/* eslint-disable no-console */
import axiosInstance from '../setup/axiosInstance';
import { TVacation } from '../types/customTypes';

type AllVacationsReturn = {
  status: string;
  data: TVacation[];
};

export const getAllVacationsByEmployeeId = async (
  id: string,
  token: string,
): Promise<AllVacationsReturn> => {
  const url = `/vacations?employeeId=${id}&type=Wypoczynkowy`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const AxiosRequestConfig = {
    headers,
  };

  try {
    const { data } = await axiosInstance.get(url, AxiosRequestConfig);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
