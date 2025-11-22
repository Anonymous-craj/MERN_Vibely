import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { serverUrl } from "../App";
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [inputClicked, setInputClicked] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleStep1 = async () => {
    setLoading(true);
    setErr("");
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/sendOtp`,
        { email },
        { withCredentials: true }
      );
      console.log(response.data);
      setStep(2);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErr(error.response?.data?.message);
    }
  };

  const handleStep2 = async () => {
    setLoading(true);
    setErr("");
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/verifyOtp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(response.data);
      setStep(3);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErr(error.response?.data?.message);
    }
  };

  const handleStep3 = async () => {
    if (newPassword !== confirmPassword) {
      return console.log("password doesnot match!");
    }
    setErr("");
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, password: newPassword },
        { withCredentials: true }
      );
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErr(error.response?.data?.message);
    }
  };
  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      {step == 1 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>
          <div
            className="relative mt-[30px] flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, email: true })}
          >
            <label
              htmlFor="email"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.email ? "top-[-15px]" : ""
              }`}
            >
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          {err && <p className="text-red-500">{err}</p>}
          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[20px]"
            disabled={loading}
            onClick={handleStep1}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
          </button>
        </div>
      )}

      {step == 2 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>
          <div
            className="relative mt-[30px] flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, otp: true })}
          >
            <label
              htmlFor="otp"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.otp ? "top-[-15px]" : ""
              }`}
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              required
            />
          </div>
          {err && <p className="text-red-500">{err}</p>}
          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[20px]"
            disabled={loading}
            onClick={handleStep2}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Submit "}
          </button>
        </div>
      )}
      {/* newPassword field */}
      {step == 3 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Reset Password</h2>
          <div
            className="relative mt-[30px] flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() =>
              setInputClicked({ ...inputClicked, newPassword: true })
            }
          >
            <label
              htmlFor="newPassword"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.newPassword ? "top-[-15px]" : ""
              }`}
            >
              Enter New Password
            </label>
            <input
              type="text"
              id="newPassword"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
            />
          </div>

          {/* confirmPassword field */}

          <div
            className="relative mt-[30px] flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() =>
              setInputClicked({ ...inputClicked, confirmPassword: true })
            }
          >
            <label
              htmlFor="confirmPassword"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.confirmPassword ? "top-[-15px]" : ""
              }`}
            >
              Confirm New Password
            </label>
            <input
              type="text"
              id="confirmPassword"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
          </div>
          {err && <p className="text-red-500">{err}</p>}
          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[20px]"
            disabled={loading}
            onClick={handleStep3}
          >
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
