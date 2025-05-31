import React, { useMemo, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import AppLayout from './components/layout/AppLayout';
import { Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Charts from './pages/Charts';
import Profile from './pages/Profile';
import LoginPage from './components/authantication/Login';
import SignupPage from './components/authantication/Signup';
import Trash from './pages/Trash';

const App = () => {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className='w-full min-h-screen'>
        <Routes>
          <Route element={<AppLayout mode={mode} setMode={setMode} />}>
            <Route index path='/' element={<Navigate to='/dashboard' />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/charts' element={<Charts />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/trash' element={<Trash />} />
          </Route>

          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </main>
    </ThemeProvider>
  );
};

export default App;
