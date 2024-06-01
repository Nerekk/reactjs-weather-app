import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Link} from "@mui/material";

export const ErrorPage = () => {
    const location = useLocation();
    const { status, message } = location.state || { status: 500, message: 'Unknown Error' };
    const navigate = useNavigate();

    return (
        <div>
            <h1>Error {status}</h1>
            <p>{message}</p>
            <Link sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Back to login page</Link>
        </div>
    );
};
