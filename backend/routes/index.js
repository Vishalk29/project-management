import express from "express";  

// Import routes related to authentication (e.g., login, register, logout)
import authRoutes from "./auth.js";  

// Create a new router instance from Express
const router = express.Router();

// Mount authentication routes under the "/auth" path
// Example: "/auth/login", "/auth/register"
router.use("/auth", authRoutes);

// Export router so it can be used in main app.js/server.js
export default router;
