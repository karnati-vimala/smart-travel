const express = require("express");
const router = express.Router();
const Destination = require("../models/Destination");

// GET all
router.get("/", async (req, res) => {
  try {
    const data = await Destination.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const newData = new Destination(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
