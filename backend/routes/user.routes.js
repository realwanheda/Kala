import express from "express";
import { registerUser, verifyUserOTP } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyUserOTP);

export default router;