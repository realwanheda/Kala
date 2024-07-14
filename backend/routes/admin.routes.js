import express from "express";
import {
  getAllRegistrations,
  getRegistrationById,
  verifyRegistration,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/registrations", getAllRegistrations);
router.get("/registrations/:id", getRegistrationById);
router.put("/registrations/:id/verify", verifyRegistration);

export default router;
