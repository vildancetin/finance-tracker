import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
    const {user}=useSelector((state)=>state.auth);
  return (
    <div>
        {user ? <Outlet/> : <Navigate to="/login"/>}
    </div>
  )
}

export default PrivateRouter