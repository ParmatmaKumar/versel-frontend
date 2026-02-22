import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="loader flex items-center justify-center"></div>
      ) : (
        <div className="mx-auto w-[1260px] max-w-[450px]">
          <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-8">
            {!emailSent ? (
              <>
                <h1 className="text-[1.875rem] font-semibold text-white">Reset Your Password</h1>
                <p className="mt-4 text-[1.125rem] text-gray-100">
                  Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery.
                </p>

                <form onSubmit={handleOnSubmit} className="mt-6 flex flex-col gap-y-4">
                  <label className="w-full">
                    <p className="mb-1 text-[0.875rem] text-gray-100">
                      Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        value={email}
                        placeholder="Enter Your Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)" }}
                        className="w-full rounded-lg bg-gray-800 p-3 pl-10 text-gray-100"
                      />
                      <AiOutlineMail className="absolute left-3 top-3 text-gray-400" size={20} />
                    </div>
                  </label>

                  <button
                    type="submit"
                    disabled={!email}
                    className={`mt-4 rounded-lg py-2 px-3 font-medium ${
                      email ? "bg-yellow-500 text-gray-900" : "bg-yellow-300 text-gray-700 cursor-not-allowed"
                    }`}
                  >
                    Send Reset Link
                  </button>

                  <div className="mt-4 text-center">
                    <Link to="/login" className="text-sm text-blue-100">
                      Back to Login
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center gap-y-4 text-center">
                <BiCheckCircle size={48} className="text-green-400" />
                <h2 className="text-2xl font-semibold text-white">Check Your Email</h2>
                <p className="text-gray-100">
                  We have sent the reset email to <span className="font-medium text-gray-200">{email}</span>. Follow the
                  instructions in the message to reset your password.
                </p>

                <div className="flex gap-x-3 mt-3">
                  <button
                    onClick={() => dispatch(getPasswordResetToken(email, setEmailSent))}
                    className="rounded-lg bg-gray-700/60 px-4 py-2 text-sm text-white"
                  >
                    Resend Email
                  </button>
                  <Link to="/login" className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-gray-900">
                    Back to Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
