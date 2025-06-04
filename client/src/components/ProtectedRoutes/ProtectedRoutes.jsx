import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
    const {token} = useSelector((state) => state.auth)
    console.log(token);
    
  return token ? children : <Navigate to={"/login"}/>
}

export default ProtectedRoutes
