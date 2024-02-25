/* eslint-disable no-console */
import axiosInstance from '../setup/axiosInstance';
import { TUser } from '../types/customTypes';
import { ChangePasswordFormValues } from '../yupValidationSchemas/changePasswordShema';

type LoginDataReturn = {
  status: string;
  data: TUser;
};

export const login = async (email: string, password: string): Promise<LoginDataReturn> => {
  try {
    const url = `/users/login`;
    const body = { email, password };
    const { data } = await axiosInstance.post(url, body);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signUp = async (token: string, password: string, confirmPassword: string) => {
  try {
    const url = `/users/registerMe/${token}`;
    const { data } = await axiosInstance.patch(url, { password, confirmPassword });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const changePassword = async (values: ChangePasswordFormValues) => {
  try {
    const url = `/users/updateMyPassword`;
    const { data } = await axiosInstance.patch(url, values);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
