import axios from 'axios';
import { TUser } from '../types/customTypes';

const BASE_URL = import.meta.env.VITE_BASE_URL;

type LoginDataReturn = {
  status: string;
  data: TUser;
};

export const login = async (
  email: string,
  password: string
): Promise<LoginDataReturn> => {
  try {
    const url = `${BASE_URL}/users/login`;
    const body = { email, password };
    const { data } = await axios.post(url, body);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
