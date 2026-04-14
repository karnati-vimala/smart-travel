const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  title: String,
  country: String,
  price: Number,
  image: String,
  description: String
});

module.exports = mongoose.model("Destination", destinationSchema);