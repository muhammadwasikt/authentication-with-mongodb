import ForgotPassword from "../auth/ForgotPassword";
import OTPVerification from "../auth/OtpVerification";
import ProtectedRoutes from "../auth/ProtectedRoutes";
import ResetPassword from "../auth/ResetPassword";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import EmailCheckPage from "../pages/EmailCheckPage";
import Home from "../pages/Home";

export const routes = [
    {
        path: "/",
        element: <ProtectedRoutes />,
        children: [
            {
                path: '/',
                element:<Home />
            },
        ]
    },
    {
        path: '/auth/signin',
        element: <SignIn />,
    },
    {
        path: '/auth/signup',
        element: <SignUp />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />
    },
    {
        path: '/reset-password/:token',
        element: <ResetPassword />
    },
    {
        path: '/password-reset-email',
        element: <EmailCheckPage />
    },
    {
        path: '/email-verification/:token',
        element: <OTPVerification />
    },
    {
        path: '*',
        element: <h1>Page not found</h1>
    }
]