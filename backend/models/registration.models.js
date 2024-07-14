import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    paymentId: { type: String, required: true },
    amountPaid: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      required: true,
    },
    qrCode: { type: String },
    ticketPdf: { type: String },
  },
  { timestamps: true }
);

export const Registration = mongoose.model("Registration", registrationSchema);
