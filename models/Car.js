const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    model: {
      type: Number,
      require: true,
    },
    isElectric: {
      type: Boolean,
      require: true,
    },
    postDate: {
      type: Date,
      default: Date.now,
    },
    features: {
      type: [String], // ["Autopilot", "Sunroof", "Heated Seats"]
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
