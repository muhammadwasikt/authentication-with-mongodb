import { useForm } from "react-hook-form"
import { getReq, postReq } from "../api/axios"
import { Link, useNavigate } from "react-router"
import { useDispatch, useSelector } from 'react-redux'
import { userId, userToken } from "../redux/reducers/userSlice"
import { useEffect } from "react"
import axios from "axios"


const SignIn = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.userId)


    const onSubmit = async (data) => {
        try {
            const response = await axios.get('https://authenticationmongodb.vercel.app/user/login', data)
            dispatch(userToken(response))
            const userResponse = await axios.get('https://authenticationmongodb.vercel.app/user/protected')
            dispatch(userId(userResponse));
            reset()
        }
        catch (error) {
            reset()
        }
    }
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    })

    return (
        <div className="w-full h-screen flex justify-center items-center p-2">
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-lg shadow-md bg-neutral-100 flex gap-4 flex-col max-w-[370px] w-full animate__animated animate__fadeInDown">
                <h1 className="text-4xl font-bold mb-4 text-center">SIGN IN</h1>
                <label className="input input-bordered flex items-center gap-2 border p-2 py-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-5 w-5 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="email" className="grow outline-none" {...register("email", { required: true })} placeholder="Email" />
                </label>
                {errors.email && <span>This field is required</span>}
                <label className="input input-bordered flex items-center gap-2 border p-2 py-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-5 w-5 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type="password" className="grow outline-none" {...register("password", { required: true })} placeholder="Password" maxLength='8' />
                </label>
                {errors.password && <span>This field is required</span>}

                <Link to='/forgot-password' className="text-sm text-blue-600 hover:underline text-right" >Forgot Password</Link>

                <button type="submit" className="btn w-full py-3">SIGN IN</button>
                <p className="text-center mt-4 flex justify-center gap-1 text-sm items-center">Don't have an account: <span className="text-blue-500 cursor-pointer text-[16px]" onClick={() => navigate('/auth/signup')}>Sign Up</span></p>
            </form>
        </div>
    )
}

export default SignIn
