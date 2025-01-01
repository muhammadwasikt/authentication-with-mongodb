import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useSelector } from "react-redux";


const ProtectedRoutes = () => {

    const navigate = useNavigate()
    const user = useSelector(state => state.user.userId)


    useEffect(() => {
        if (!user) {
            navigate('/auth/signin')
        }
    }, [user])

    return (
        <>
            {
                user && <Outlet /> 
            }
        </>
    )
}

export default ProtectedRoutes
