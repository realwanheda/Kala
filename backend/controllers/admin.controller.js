import { Registration } from "../models/registration.models.js";

export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().populate("userId eventId");
    res.json(registrations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id).populate(
      "userId eventId"
    );
    if (!registration) {
      return res.status(404).json({ msg: "Registration not found" });
    }
    res.json(registration);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const verifyRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ msg: "Registration not found" });
    }

    registration.status = "Verified";
    await registration.save();

    res.json(registration);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
