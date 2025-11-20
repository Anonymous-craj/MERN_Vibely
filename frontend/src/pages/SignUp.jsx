import React, { useState } from "react";
import logo from "../../src/assets/logo2.png";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import logo1 from "../../src/assets/logo1.png";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [inputClicked, setInputClicked] = useState({
    name: false,
    userName: false,
    email: false,
    password: false,
  });

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          name,
          userName,
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      <div className="w-[90%] bg-white lg:max-w-[60%] h-[600px] rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]">
        <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px]">
          <div className="flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]">
            <span>Sign Up To</span>
            <img src={logo} alt="" className="w-[70px]" />
          </div>
          {/* Name input field open */}
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, name: true })}
          >
            <label
              htmlFor="name"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.name ? "top-[-15px]" : ""
              }`}
            >
              Enter Your Name
            </label>
            <input
              type="text"
              id="name"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          {/* name input field closed */}

          {/* userName inputfield open */}
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, userName: true })}
          >
            <label
              htmlFor="userName"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.userName ? "top-[-15px]" : ""
              }`}
            >
              Enter Your UserName
            </label>
            <input
              type="text"
              id="userName"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
            />
          </div>
          {/* userName input field closed */}

          {/* email input field open */}
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
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
          {/* email input field closed */}

          {/* password input field open */}

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, password: true })}
          >
            <label
              htmlFor="password"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.password ? "top-[-15px]" : ""
              }`}
            >
              Enter Your Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            {!showPassword ? (
              <FaEye
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <FaEyeSlash
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>
          {/* password input field closed */}

          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[20px]"
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Sign Up"}
          </button>
          <p
            className="cursor-pointer text-gray-800"
            onClick={() => navigate("/signin")}
          >
            Already Have an Account ?
            <span className="border-b-2 border-b-black pb-[3px] text-black ml-[5px]">
              Sign In
            </span>
          </p>
        </div>
        <div className="md:w-[50%] h-full hidden lg:flex flex-col justify-center items-center bg-[#000000] gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black">
          <img src={logo1} alt="" className="w-[40%]" />
          <p>Not Just A Platform, It's A VYBE</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
