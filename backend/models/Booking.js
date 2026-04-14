const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destinationTitle: { type: String, required: true },
  destinationLocation: { type: String, required: true },
  price: { type: String, required: true },
  days: { type: Number, required: true },
  budget: { type: String, required: true },
  companions: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
