import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { postReq } from "../api/axios";
import { useNavigate, useParams } from "react-router";

const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const navigate = useNavigate()
    const {token} = useParams()

    const onSubmit = async (data) => {
        const { password, confirmPassword } = data

        if (password!== confirmPassword) {
            toast.error("Passwords do not match.");
            reset()
            return;
        }

        const response = await postReq(`/user/reset-password/${token}`, {password: password})
        navigate('/auth/signin')
        reset()
        

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Reset Your Password
                </h2>
                <p className="mt-2 text-sm text-center text-gray-600">
                    Enter your new password below.
                </p>

                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label htmlFor="password" className="label">
                            <span className="label-text font-medium text-gray-700">
                                New Password
                            </span>
                        </label>
                        <input
                            type="password"
                            maxLength='8'
                            id="password"
                            placeholder="Password"
                            className={`input input-bordered w-full ${errors.password ? "border-red-500" : ""
                                }`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="form-control mt-4">
                        <label htmlFor="confirmPassword" className="label">
                            <span className="label-text font-medium text-gray-700">
                                Confirm Password
                            </span>
                        </label>
                        <input
                            type="password"
                            maxLength='8'
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            className={`input input-bordered w-full ${errors.confirmPassword ? "border-red-500" : ""
                                }`}
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                            })}
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-6"
                    >
                        Reset Password
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <a
                        href="/auth/signin"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Back to Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
