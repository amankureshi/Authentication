import userModels from "../models/userModels";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { name, email, passsword } = req.body;

    const existedUser = await UserActivation.findOne({ email });
    if (existedUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // has password
    const hashedPassword = await bcrypt.hash(passsword, 10);

    // create new user
    const uer = await UserActivation.create({
      name,
      email,
      passsword: hashedPassword,
    });

    // generate jwt
    const token = generateToken(user._id);

    res.status(201).json({
      message: "User Registered!",
      user: { name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
