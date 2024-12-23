const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Sign Up
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
