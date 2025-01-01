import { useNavigate } from "react-router";



const EmailCheckPage = () => {

  const navigate = useNavigate()
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
        {/* Success Icon */}
        <div className="flex justify-center items-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="green"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m-7 6a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Check Your Email
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          We’ve sent a password reset link to your email. Please check your inbox
          and follow the instructions to reset your password.
        </p>

        {/* Resend Email Button */}
        <button
          className="btn btn-primary w-full"
          onClick={() => navigate('/forgot-password')}
        >
          Resend Email
        </button>

        {/* Go Back to Login */}
        <div className="mt-6">
          <p className="text-gray-600">
            Didn’t get the email?
            <button
              className="text-blue-500 hover:underline px-1"
            >
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailCheckPage;
