const express = require("express");
const router = express.Router();
const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey"; // later move to .env

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, username, email, phone, password } = req.body;

    // check user exists
    let userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: "User with this email or username already exists!" });
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    let user = new User({ name, username, email, phone, password: hashedPassword });
    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found with this username" });
    }

    // 🔐 compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 🎟️ generate token
    const token = jwt.sign(
      { id: user._id },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;