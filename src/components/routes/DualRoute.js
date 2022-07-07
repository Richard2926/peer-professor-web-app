import React from 'react';
import { Navigate } from 'react-router-dom';

const DualRoute = (props) => {
    return props.isVerifying ? <div/> : props.isAuthenticated ? <Navigate to={props.redirect} /> : <Navigate to={props.alternate} />;
}

export default DualRoute;