import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
      message: "User is created successfully",
    }); // success response

    // TODO: SEND EMAIL (verification link)
  } catch (error) {
    console.log(error); // log error for debugging
    response.status(500).json({ message: "Internal server error" }); // fallback error response
  }
};

const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return response.status(400).json({
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { userId: user._id, purpose: "login" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.lastLogin = new Date();
    await user.save();

    const userData = user.toObject();
    delete userData.password;
    response.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export { registerUser, loginUser };
