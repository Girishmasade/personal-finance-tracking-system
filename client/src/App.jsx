import React from 'react'
import AppLayout from './components/layout/AppLayout'
import { Navigate, Route, Routes } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Charts from './pages/Charts'
import Profile from './pages/Profile'

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
      
     </Routes>
    </main>
  )
}

export default App
