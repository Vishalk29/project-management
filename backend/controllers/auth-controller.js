import User from "../models/user.js";
import bcrypt from "bcrypt";
const registerUser = async (request, response) => {
  try {
    const { email, name, password } = request.body; // extract fields from request body

    const existingUser = await User.findOne({ email }); // check if email already exists
    if (existingUser) {
      return response.status(400).json({
        message: "Email address already in use",
      }); // return early if user exists
    }

    const salt = await bcrypt.genSalt(10); // generate salt for hashing
    const hashPassword = await bcrypt.hash(password, salt); // hash the password

    const newUser = await User.create({
      email,
      password: hashPassword,
      name,
    }); // save new user to DB

    response.status(201).json({
      message:
        "Verification email sent to your email , Please check and verify the account",
    }); // success response

    // TODO: SEND EMAIL (verification link)
  } catch (error) {
    console.log(error); // log error for debugging
    response.status(500).json({ message: "Internal server error" }); // fallback error response
  }
};

const loginUser = async (request, response) => {
  try {
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export { registerUser, loginUser };
