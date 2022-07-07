import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = (props) => {
    return props.isVerifying ? <div/> : props.isAuthenticated ? <Outlet/> : <Navigate to={props.redirect} />;
}

export default PrivateRoute;