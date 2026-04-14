const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://localhost:27017/travelDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const destinationRoutes = require("./routes/destinationRoutes");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/destinations", destinationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});