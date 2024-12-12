// Required Modules
const express = require("express");
const cors = require("cors");
const path = require("path");

// Configurations and Utilities
const dbConnection = require("./config/db");
const Config = require("./config");
const errorHandler = require("./middleware/errorHandler");
const quizRoutes = require("./routes/quizRoutes");

const app = express();
const PORT = Config.PORT || 5000;

// Middleware
app.use(express.json()); // Parses incoming JSON payloads
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded data
app.use(cors()); // Enables CORS

// Serve Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Custom Middleware
app.use(errorHandler);

// Database Connection
(async () => {
  try {
    await dbConnection();
    console.log("Database connected successfully.");
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the process if DB connection fails
  }
})();

// Routes
app.use("/api", quizRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
