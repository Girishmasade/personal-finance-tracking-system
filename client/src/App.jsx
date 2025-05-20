import React from 'react'
import AppLayout from './components/layout/AppLayout'
import { Navigate, Route, Routes } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Charts from './pages/Charts'
import Profile from './pages/Profile'
import Signup from './pages/authantication/Signup'
import Login from './pages/authantication/Login'

const App = () => {
  return (
    <main className='w-full min-h-screen'>

     <Routes>
        
       <Route element={<AppLayout/>}>

        <Route index path='/' element={<Navigate to='/dashboard'/>}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='/charts' element={<Charts />} />
        <Route path='/profile' element={<Profile />} />
      </Route>

      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
     </Routes>
    </main>
  )
}

export default App
