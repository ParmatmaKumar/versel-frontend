import { useSelector } from "react-redux"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { resetPassword } from "../services/operations/authAPI";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const { loading } = useSelector((state) => state.auth);
    const { password, confirmPassword } = formData;

    const handleChange = (e) => {
        setFormData((prevData) => (
            { ...prevData, [e.target.name]: e.target.value }
        ))
    }

    const handleOneSubmit = async (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        // dispatch update password action and wait for result
        const success = dispatch(resetPassword(password, confirmPassword, token));
        if (success) {
            
            navigate('/login')
        }
    }

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading ? (
                    <div className="loader"></div>
                ) : (
                    <div className="mx-auto w-[1260px] max-w-[450px]">
                        <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-8">
                            <h1 className="text-[1.875rem] font-semibold text-white">Choose New Password</h1>
                            <p className="mt-4 text-[1.125rem] text-gray-100">Almost done. Enter your new password and you're all set.</p>

                            <form onSubmit={handleOneSubmit} className="mt-6 flex flex-col gap-y-4">
                                <label className="w-full relative">
                                    <p className="mb-1 text-[0.875rem] text-gray-100">New Password <sup className="text-pink-200">*</sup></p>
                                    <input
                                        name="password"
                                        value={password}
                                        onChange={handleChange}
                                        required
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter New Password"
                                        style={{ boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)" }}
                                        className="w-full rounded-lg bg-gray-800 p-3 pr-12 text-gray-100"
                                    />
                                    <span
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-3 top-[38px] z-10 cursor-pointer"
                                    >
                                        {showPassword ? <AiFillEyeInvisible fontSize={24} /> : <AiFillEye fontSize={24} />}
                                    </span>
                                </label>

                                <label className="w-full relative">
                                    <p className="mb-1 text-[0.875rem] text-gray-100">Confirm New Password <sup className="text-pink-200">*</sup></p>
                                    <input
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleChange}
                                        required
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm New Password"
                                        style={{ boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)" }}
                                        className="w-full rounded-lg bg-gray-800 p-3 pr-12 text-gray-100"
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute right-3 top-[38px] z-10 cursor-pointer"
                                    >
                                        {showConfirmPassword ? <AiFillEyeInvisible fontSize={24} /> : <AiFillEye fontSize={24} />}
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    className={`mt-4 rounded-lg py-2 px-3 font-medium ${password && confirmPassword ? "bg-yellow-500 text-gray-900" : "bg-yellow-300 text-gray-700 cursor-not-allowed"}`}
                                >
                                    Update Password
                                </button>

                                <div className="mt-4 text-center">
                                    <Link to="/login" className="text-sm text-blue-100">Back to Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default UpdatePassword