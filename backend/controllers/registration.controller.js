import { Registration } from "../models/registration.models.js";
import { Event } from "../models/event.models.js";
import { User } from "../models/user.models.js";

export const registerForEvent = async (req, res) => {
  const { userId, eventId, paymentId, amountPaid, qrCode, ticketPdf } =
    req.body;

  try {
    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    if (!user || !event) {
      return res.status(400).json({ msg: "Invalid user or event" });
    }

    if (event.availableSeats <= 0) {
      return res.status(400).json({ msg: "No available seats" });
    }

    const registration = new Registration({
      userId,
      eventId,
      paymentId,
      amountPaid,
      status: "Pending",
      qrCode,
      ticketPdf,
    });

    event.availableSeats -= 1;

    await registration.save();
    await event.save();

    res.status(201).json(registration);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const verifyPayment = async (req, res) => {
  const { paymentId } = req.body;

  try {
    const registration = await Registration.findOne({ paymentId });

    if (!registration) {
      return res.status(400).json({ msg: "Invalid payment ID" });
    }

    registration.status = "Completed";
    await registration.save();

    res
      .status(200)
      .json({ msg: "Payment verified and registration completed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const validateQRCode = async (req, res) => {
  const { qrCode } = req.params;

  try {
    const registration = await Registration.findOne({ qrCode });

    if (!registration) {
      return res.status(400).json({ msg: "Invalid QR Code" });
    }

    res.status(200).json(registration);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
