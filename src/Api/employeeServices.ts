import axiosInstance from '../setup/axiosInstance';

export const getEmployeeById = async (id: string) => {
  const url = `/employees/${id}`;

  try {
    const { data } = await axiosInstance.get(url);

    return data;
  } catch (error) {
    console.log(error);
  }
};
