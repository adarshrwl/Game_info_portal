const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required!" });
    }

    // Find the user by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ msg: "Invalid Email or Password!" });
    }

    // Compare the plain-text password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid Email or Password!" });
    }

    // Respond with user details if login is successful
    return res.status(200).json({
      msg: "Logged in successfully!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ msg: "Error logging in user!" });
  }
};

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
  
    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required!" });
    }

    // Simple email format validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email format!" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists!" });
    }

    // Password strength validation (minimum length: 8 characters, contains at least one number and one letter)
    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 characters long!" });
    }
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   return res
    //     .status(400)
    //     .json({
    //       msg: "Password must contain at least one letter and one number!",
    //     });
    // }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(201).json({ msg: "User created successfully!" });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      msg: "Error occurred while registering user!",
    });
  }
};

module.exports = { login, signUp };
