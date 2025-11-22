import sendMail from "../config/Mail.js";
import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signUp = async (req, res) => {
  try {
    const { name, email, password, userName } = req.body;

    //Checking user by email
    const findByEmail = await User.findOne({ email });
    if (findByEmail) {
      res.status(400).json({
        message: "Email already exists!",
      });
      return;
    }

    //Checking user by username
    const findByUserName = await User.findOne({ userName });
    if (findByUserName) {
      res.status(400).json({
        message: "Username already exists!",
      });
      return;
    }

    //Password validation of atleast 6 characters
    if (password.length < 6) {
      res.status(400).json({
        message: "Password length must be atleast 6 characters long!",
      });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      email,
      userName,
      password: hashedPassword,
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: false,
    });

    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: `Signup error: ${error}`,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    //Checking if user exists or not
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(404).json({
        message: "User not found!",
      });
      return;
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        message: "Invalid Password!",
      });
      return;
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: false,
    });

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: `SignIn error: ${error}`,
    });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "SignOut successfull!",
    });
  } catch (error) {
    res.status(500).json({
      message: `SignOut error: ${error}`,
    });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        message: "User not found!",
      });
      return;
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;

    await user.save();

    await sendMail(email, otp);
    return res.status(200).json({
      message: "email successfully sent!",
    });
  } catch (error) {
    res.status(500).json({
      message: `Send OTP error: ${error}`,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp !== otp || user.otpExpiry < Date.now()) {
      res.status(400).json({
        message: "Invalid or expired otp!",
      });
      return;
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    return res.status(200).json({
      message: "OTP Verified!",
    });
  } catch (error) {
    res.status(500).json({
      message: `VerifyOTP error: ${error}`,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      res.status(400).json({
        message: "otp verification required!",
      });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: `Reset Password error: ${error}`,
    });
  }
};
