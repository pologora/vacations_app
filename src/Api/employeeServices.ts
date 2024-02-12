import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getEmployeeById = async (id: string) => {
  const url = `${BASE_URL}/employees/${id}`;

  try {
    const { data } = await axios.get(url);

    return data;
  } catch (error) {
    console.log(error);
  }
};
