const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/auth"); // 👈 import middleware

// POST /api/bookings (Protected Route)
router.post("/", auth, async (req, res) => {
  try {
    const { destinationTitle, destinationLocation, price, days, budget, companions } = req.body;

    const newBooking = new Booking({
      userId: req.user.id, // ✅ from token (NOT from frontend)
      destinationTitle,
      destinationLocation,
      price,
      days,
      budget,
      companions
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking successful",
      booking: newBooking
    });

  } catch (error) {
    res.status(500).json({ message: "Server error while booking" });
  }
});

// GET /api/bookings (Protected Route)
router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching bookings" });
  }
});

module.exports = router;