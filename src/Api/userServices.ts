import axios from 'axios';
import { TUser, UserCreationType } from '../types/customTypes';
const BASE_URL = import.meta.env.VITE_BASE_URL;

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
  const url = `${BASE_URL}/users/${id}`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserByEmployeeId = async (id: string) => {
  const url = `${BASE_URL}/users?employeeId=${id}`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createUser = async (
  userData: UserCreationType
): Promise<CreateUserDataReturn> => {
  const url = `${BASE_URL}/users/signup`;
  try {
    const { data } = await axios.post(url, userData);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
