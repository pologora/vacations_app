/* eslint-disable no-console */
import axiosInstance from '../setup/axiosInstance';
import type { TProposal } from '../types/customTypes';
import { ProposalCreateValues } from '../yupValidationSchemas/proposalValidationSchema';

type AllProposalsReturn = {
  status: string;
  data: TProposal[];
  vacationsSize: number;
};

type CreateVacationProposalReturn = {
  status: string;
  data: {
    acknowledged: true;
    insertedId: string;
  };
};

export const getAllProposalsByEmployeeId = async (url: string): Promise<AllProposalsReturn> => {
  try {
    const { data } = await axiosInstance.get(url);
    console.log(url);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createVacationProposal = async (
  data: ProposalCreateValues,
): Promise<CreateVacationProposalReturn> => {
  const url = `/proposals`;

  try {
    const { data: resData } = await axiosInstance.post(url, data);
    return resData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteVacationProposal = async (id: string) => {
  try {
    const url = `/proposals/${id}`;
    const { data } = await axiosInstance.delete(url);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateVacationProposal = async (id: string, update: ProposalCreateValues) => {
  try {
    const url = `/proposals/${id}`;
    const { data } = await axiosInstance.patch(url, update);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getVacationProposalById = async (id: string) => {
  try {
    const url = `/proposals/${id}`;
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
