import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useSelector } from "react-redux";


const ProtectedRoutes = () => {

    const navigate = useNavigate()
    const user = useSelector(state => state.user.userId)



    useEffect(() => {
        if (!user.length > 0) {
            navigate('/auth/signin')
        }
    })

    return (
        <>
            {
                user.length > 0 && <Outlet /> 
            }
        </>
    )
}

export default ProtectedRoutes
