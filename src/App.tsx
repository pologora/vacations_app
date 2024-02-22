import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/Home/Home';
import { SignIn } from './components/auth/signIn/SignIn';
import { SignUp } from './components/auth/signUp/SignUp';
import { NotFound } from './components/NotFound/NotFound';
import { AppLayout } from './components/AppLayout.tsx/AppLayout';
import { ProtectedRoute } from './components/ProtectedRoute.tsx/ProtectedRoute';
import { Account } from './components/Account/Account';
import { CssBaseline } from '@mui/material';
import { ProposalVacations } from './components/ProposalVacations/ProposalVacations';
import CreateProposalVacation from './components/ProposalVacations/CreateProposalVacation';
import { ProposalInfo } from './components/ProposalVacations/ProposalInfo';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route element={<Home />} path='/' />
          <Route element={<Account />} path='/account' />
          <Route element={<ProposalVacations />} path='/proposals' />
          <Route element={<CreateProposalVacation />} path='/proposals/create' />
          <Route element={<ProposalInfo />} path='/proposals/:id' />
        </Route>
        <Route element={<SignUp />} path='/signup/:token' />
        <Route element={<SignIn />} path='/signin' />
        <Route element={<NotFound />} path='*' />
      </Routes>
    </>
  );
};

export default App;
