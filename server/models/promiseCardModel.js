const mongoose = require("mongoose");

const promiseCardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  occasion: { type: String, required: true },
  gifts: [
    {
      description: String,
      image: String,
      link: String,
      monetaryValue: Number,
      signee: {
        name: String,
        date: Date,
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PromiseCard", promiseCardSchema);
