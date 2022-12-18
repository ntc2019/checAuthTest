import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

type RequireAdminProps = {
    children: JSX.Element[] | JSX.Element
}

const RequireAdmin = ({ children }: RequireAdminProps) => {
    const { checkAdmin } = useAuth();
    let isAdmin;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function check() {
            isAdmin = await checkAdmin();
            setLoading(false)
        }
        check();
    }, [])
    let content;
    if (loading) {
        content = <h1>Loading...</h1>
    } else {
        {
            isAdmin
                ? { children }
                : <Navigate to='/accessdenied' />
        }
    }
    return (
        <>
            {content}
        </>
    )
}

export default RequireAdmin