import OTPInput from "react-otp-input"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { sendOtp, signUp } from "../services/operations/authAPI"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

const VerifyEmail = () => {
  const { signupData, loading } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("")

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    // basic client-side validation to avoid sending incomplete payload
    if (!otp || otp.length !== 6) {
      toast.error("Please enter the 6-digit verification code")
      return
    }

    // correct argument order: otp before navigate
    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-liner-to-br from-gray-900 via-gray-950 to-black px-4">

      {/* Glow Background */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-yellow-500 opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>

      {loading ? (
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent"></div>
      ) : (
        <div className="relative w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">

          <h1 className="text-3xl font-bold text-white text-center">
            Verify Your Email
          </h1>

          <p className="mt-3 text-center text-gray-400 text-sm">
            We sent a 6-digit verification code to your email.
            Enter it below to activate your account.
          </p>

          <form onSubmit={handleOnSubmit} className="mt-8 space-y-6">

            {/* OTP INPUT */}
            <div className="flex justify-center">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                shouldAutoFocus
                renderInput={(props) => (
                  <input
                    {...props}
                    className="mx-1 h-14 min-w-10 rounded-md border border-gray-700 bg-gray-900 text-center text-xl font-semibold text-white transition-all duration-200"
                  />
                )}
              />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col gap-4">

              <button
                type="submit"
                className="w-full rounded-xl py-3 transition-all duration-300 bg-gray-700 text-white cursor-pointer "  
              >
                Verify Email
              </button>

              <button
                type="button"
                onClick={() => dispatch(sendOtp(signupData?.email, navigate))}
                className="text-sm text-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                Resend Code
              </button>

              <Link
                to="/login"
                className="text-sm text-center text-gray-400 hover:text-white transition-colors"
              >
                ← Back to Login
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default VerifyEmail