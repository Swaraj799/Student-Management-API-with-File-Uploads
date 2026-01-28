require("dotenv").config();
const express = require("express");
const multer = require("multer");

const connectDB = require("./config/database");
const studRoutes = require("./routes/students.route");

const app = express();

// --------------------
// Database connection
// --------------------
connectDB();

// --------------------
// Routes
// --------------------
app.use("/api/students", studRoutes);

// --------------------
// Multer & Global Error Handler
// --------------------
app.use((err, req, res, next) => {
  // Multer-specific errors
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }

  // Any other error
  if (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }

  next();
});

// --------------------
// Server start
// --------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("started");
});
