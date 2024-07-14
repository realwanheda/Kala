import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { name, email, phone, password, gender } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = uuidv4().split("-")[0];

    user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      otp,
      gender,
    });

    await user.save();

    // TODO: Send OTP via email/SMS (mostly ill use twilio still gonna ask)

    res.status(201).json({ msg: "User registered, please verify OTP" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const verifyUserOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.status(200).json({ msg: "User verified" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
