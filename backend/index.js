import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import routes from "./routes/index.js";
dotenv.config(); // Load environment variables from .env file

const app = express();

//
// ----------- Middlewares -----------
//

// Enable CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Only allow frontend app
    methods: ["GET", "POST", "DELETE", "PUT"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// HTTP request logger (for debugging requests in console)
app.use(morgan("dev"));

// Parse JSON request body
app.use(express.json());

//
// ----------- Database Connection -----------
//
mongoose
  .connect(process.env.MONGODB_URI) // MongoDB URI from .env
  .then(() => console.log("✅ DB connected successfully"))
  .catch((err) => console.error("❌ Failed to connect DB:", err));

//
// ----------- Routes -----------
//

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Project management API",
  });
});

// http:localhost:5001/api-v1
app.use("/api-v1", routes);

//
// ----------- Not Found Middleware -----------
//

// This will run if no route above matches
app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

//
// ----------- Error Handling Middleware -----------
//

// This catches any errors thrown by routes or middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack trace
  res.status(500).json({ message: "Internal server error" });
});

//
// ----------- Server Start -----------
//
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
