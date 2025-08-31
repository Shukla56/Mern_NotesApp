import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoutes() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
        console.log(user)
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return <Outlet />;
}
