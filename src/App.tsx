import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/Home/Home';
import { SignIn } from './components/auth/signIn/SignIn';
import { SignUp } from './components/auth/signUp/SignUp';
import { NotFound } from './components/NotFound/NotFound';
import { AppLayout } from './components/AppLayout.tsx/AppLayout';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<Home />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Route>
      <Route path='/signup/:employeeId' element={<SignUp />}></Route>
      <Route path='/signin' element={<SignIn />}></Route>
    </Routes>
  );
}

export default App;
