// Import mongoose and its Schema class
import mongoose, { Schema } from "mongoose";

// Define the User schema (structure of the user document)
const userSchema = new Schema(
  {
    // User email (unique, lowercase, required)
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, // removes extra spaces
      lowercase: true, // always stores in lowercase
    },

    // User password (required, not returned by default in queries for security)
    password: {
      type: String,
      required: true,
      select: false, // exclude from query results unless explicitly selected
    },

    // User's full name
    name: {
      type: String,
      required: true,
      trim: true, // removes extra spaces
    },

    // Optional profile picture URL
    profilePicture: {
      type: String,
    },

    // // Whether the user's email has been verified
    // isEmailVerified: {
    //   type: Boolean,
    //   default: false,
    // },

    // Track the last login date
    lastLogin: {
      type: Date,
    },

    // Whether two-factor authentication is enabled
    is2FAEnabled: {
      type: Boolean,
      default: false,
    },

    // Temporary OTP for 2FA (not returned in queries for security)
    twoFAOtp: {
      type: String,
      select: false,
    },

    // Expiration time for the OTP (not returned in queries for security)
    twoFAOtpExpires: {
      type: Date,
      select: false,
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Create the User model from schema
const User = mongoose.model("User", userSchema);

// Export the model so it can be imported in routes, controllers, etc.
export default User;
