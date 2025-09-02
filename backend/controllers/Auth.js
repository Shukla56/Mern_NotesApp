import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
const Register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Login
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const checkPassword = await bcrypt.compare(password, foundUser.password);
    if (!checkPassword) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ userId: foundUser._id }, process.env.SecriteKey, { expiresIn: "3d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,        // ✅ https ke liye
      sameSite: "none",    // ✅ cross-site requests ke liye
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 din
    });

    res.status(200).json({ success: true, message: "User login successfully", user: foundUser, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Logout
const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ success: true, message: "Logout successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Check Login
const isLogin = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(200).json({ success: false, message: "User not logged in", isLoggedIn: false });
    }

    res.status(200).json({ success: true, message: "User is logged in", user, isLoggedIn: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error", isLoggedIn: false });
  }
};

export { Register, Login, Logout, isLogin };
