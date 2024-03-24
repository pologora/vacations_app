import { useQuery } from '@tanstack/react-query';
import { useUserContext } from '../../contexts/UserContext';
import { getAllProposalsByEmployeeId } from '../../Api/proposalServices';
import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import style from './ProposalVacations.module.css';
import { Loading } from '../Loading/Loading';
import { ProposalsList } from './ProposalsList';
import { useProposalsContext } from '../../contexts/ProposalsContext';

const startPage = 1;

export const ProposalVacations = () => {
  const [page, setPage] = useState(startPage);
  const { user } = useUserContext();
  const { saveProposals } = useProposalsContext();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => {
      if (user) {
        const id = user.employeeId;
        const url = `/proposals?employeeId=${id}&page=${page}`;

        return getAllProposalsByEmployeeId(url);
      }
    },
    queryKey: ['proposals', user!.employeeId, page],
  });

  useEffect(() => {
    if (data?.data) {
      saveProposals(data.data);
    }
  }, [data]);

  const sumPendingProposalsDays = data?.data.reduce((acc, item) => {
    if (item.status === 'pending') {
      return acc + item.duration;
    }

    return acc;
    // eslint-disable-next-line no-magic-numbers
  }, 0);

  const itemsPerPage = 25;
  const minPage = 1;
  const vacationsSize = data?.vacationsSize;

  const pagesCount = Math.ceil((vacationsSize || minPage) / itemsPerPage) || minPage;

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isError) {
    return <div className={style.error}>{error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className={style.proposalsPageTitle}>Złożone wnioski</h2>
      <p>Razem dni: {sumPendingProposalsDays}</p>
      <ProposalsList proposalsData={data!.data} />
      <div className={style.paginationContainer}>
        {pagesCount > minPage && (
          <Pagination count={pagesCount} page={page} onChange={handlePageChange} />
        )}
      </div>
    </div>
  );
};
