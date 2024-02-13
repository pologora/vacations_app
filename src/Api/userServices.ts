import axiosInstance from '../setup/axiosInstance';
import { TUser, UserSignupData } from '../types/customTypes';

type CreateUserDataReturn = {
  status: string;
  data: {
    insertedId: string | null;
  };
};

type GetUserDataReturn = {
  status: string;
  data: TUser;
};

export const getUser = async (id: string): Promise<GetUserDataReturn> => {
  const url = `/users/${id}`;
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserByEmployeeId = async (id: string) => {
  const url = `/users?employeeId=${id}`;
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createUser = async (
  userData: UserSignupData
): Promise<CreateUserDataReturn> => {
  const url = `/users/signup`;
  try {
    const { data } = await axiosInstance.post(url, userData);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
