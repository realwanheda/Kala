import express from "express";
import {
  registerUser,
  verifyUserOTP,
  sendOTP,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyUserOTP);

export default router;
