import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { postReq } from "../api/axios";

const OTPVerification = () => {
    const { handleSubmit, control, setValue, watch, reset } = useForm({
        defaultValues: {
            otp: ["", "", "", "", "", ""], // 6 input fields for OTP
        },
    });

    const otp = watch("otp");
    const { token } = useParams()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const otpCode = data.otp.join("");
        
        const response = await postReq(`/user/email-verification/${token}`, {emailOtp:otpCode})
        reset()
        console.log(response);
        if (response) {
            navigate('/auth/signin')
        }
        
    };

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (!/^[0-9]?$/.test(value)) return; // Allow only digits
        setValue(`otp.${index}`, value); // Update the specific OTP field

        // Automatically move to the next input field if a digit is entered
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleBackspace = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
                {/* Icon */}
                <div className="flex justify-center items-center mb-6">
                    <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="blue"
                            className="w-10 h-10"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.837.683a2 2 0 011.226 2.514l-.703 2.588a8.001 8.001 0 11-6.495-6.495l2.588-.703a2 2 0 012.514 1.226l.683 1.837z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                    Verify Your Account
                </h1>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                    Enter the 6-digit code sent to your email or phone number.
                </p>

                {/* OTP Input Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex justify-center gap-2">
                        {[...Array(6)].map((_, index) => (
                            <Controller
                                key={index}
                                name={`otp.${index}`}
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength="1"
                                        className="w-12 h-12 border rounded-lg text-center text-xl focus:outline-none focus:ring focus:ring-blue-300"
                                        onChange={(e) => handleInputChange(e, index)}
                                        onKeyDown={(e) => handleBackspace(e, index)}
                                    />
                                )}
                            />
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full">
                        Verify
                    </button>
                </form>

                {/* Resend OTP */}
                <div className="mt-6">
                    <p className="text-gray-600">
                        Didn’t receive the code?{" "}
                        <button
                            onClick={() => alert("Resending OTP...")}
                            className="text-blue-500 hover:underline"
                        >
                            Resend OTP
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
