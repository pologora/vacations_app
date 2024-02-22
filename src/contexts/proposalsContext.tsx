import { ReactNode, createContext, useState } from 'react';
import { TProposal } from '../types/customTypes';
import { getSafeContext } from './getSafeContext';

type ProposalsContextProps = {
  proposals: TProposal[];
  saveProposals: (value: TProposal[]) => void;
};

type ProposalsContextProviderProps = {
  children: ReactNode;
};

const ProposalsContext = createContext<ProposalsContextProps | null>(null);

export const ProposalsContextProvider = ({ children }: ProposalsContextProviderProps) => {
  const [proposals, setProposals] = useState<TProposal[]>([]);

  const saveProposals = (newProposals: TProposal[]) => setProposals(newProposals);

  return (
    <ProposalsContext.Provider value={{ proposals, saveProposals }}>
      {children}
    </ProposalsContext.Provider>
  );
};

export const useProposalsContext = getSafeContext(ProposalsContext, 'Proposals context');
