const express = require("express");
const router = express.Router();
const PromiseCard = require("../models/promiseCardModel");
const authMiddleware = require("../middleware/auth");

// Create a new promise card
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { occasion, gifts } = req.body;
    const promiseCard = new PromiseCard({
      userId: req.user.id,
      occasion,
      gifts,
    });

    await promiseCard.save();
    res.status(201).json(promiseCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
