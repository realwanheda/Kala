import express from "express";
import {
  registerForEvent,
  verifyPayment,
  validateQRCode,
} from "../controllers/registration.controller.js";

const router = express.Router();

router.post("/register", registerForEvent);
router.post("/payment/verify", verifyPayment);
router.get("/:qrCode", validateQRCode);

export default router;
