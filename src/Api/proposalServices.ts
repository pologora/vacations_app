/* eslint-disable no-console */
import axiosInstance from '../setup/axiosInstance';
import type { TProposal } from '../types/customTypes';
import { ProposalCreateValues } from '../yupValidationSchemas/proposalValidationSchema';

type AllProposalsReturn = {
  status: string;
  data: TProposal[];
};

export const getAllProposalsByEmployeeId = async (
  id: string,
  page?: number,
  thisYear?: boolean,
): Promise<AllProposalsReturn> => {
  const url = `/proposals?employeeId=${id}&page=${page}&thisYear=${thisYear}`;

  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createVacationProposal = async (data: ProposalCreateValues) => {
  const url = `/proposals`;

  try {
    const { data: resData } = await axiosInstance.post(url, data);
    return resData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
