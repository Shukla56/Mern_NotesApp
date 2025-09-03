import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

const TokenVerfication = async (req, res, next) => {
  try {
    const token = req.cookies.token; // 👈 frontend se cookie bhejni zaroori hai
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized, please login" });
    }

    // ✅ use verify instead of decode
    const decoded = jwt.verify(token, process.env.SecriteKey);

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "User Not Found" });
    }

    req.userId = user._id; // ✅ ab NotesController me available hoga
    next();

  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

export { TokenVerfication };
