/* eslint-disable no-console */
import axiosInstance from '../setup/axiosInstance';
import { TEmployee } from '../types/customTypes';

type GetEmployeeByIdReturnValue = {
  status: string;
  data: TEmployee;
};

export const getEmployeeById = async (id: string): Promise<GetEmployeeByIdReturnValue> => {
  const url = `/employees/${id}`;
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
