// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const auth = require('./middleware/auth');
const promiseCardRoutes = require("./routes/promiseCardRoutes");

// Initialize dotenv configuration
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/promiseCards", promiseCardRoutes);
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
