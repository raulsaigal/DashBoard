// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

// dotenv.config(); // For loading environment variables (e.g., JWT secret)
// const app = express();
// const port = 5000;

// app.use(express.json()); // For parsing JSON data

// let users = []; // For simplicity, we will store users in an array. (In production, use a database)

// // User registration endpoint
// app.post("/api/register", async (req, res) => {
//   console.log(req.json);
//   const { email, password } = req.body;

//   // Check if user already exists
//   const userExists = users.find((user) => user.email === email);
//   if (userExists) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Save user (In real scenarios, save in a database)
//   const newUser = { email, password: hashedPassword };
//   users.push(newUser);

//   res.status(201).json({ message: "User registered successfully" });
// });

// // User login endpoint
// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;

//   // Find user
//   const user = users.find((user) => user.email === email);
//   if (!user) {
//     return res.status(400).json({ message: "Invalid credentials" });
//   }

//   // Verify password
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(400).json({ message: "Invalid credentials" });
//   }

//   // Generate JWT token
//   const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

//   res.json({ message: "Login successful", token });
// });

// // Protected route example (requires token)
// app.get("/api/dashboard", authenticateJWT, (req, res) => {
//   res.json({ message: "Welcome to the dashboard", user: req.user });
// });

// // Middleware to authenticate JWT token
// function authenticateJWT(req, res, next) {
//   const token = req.header("Authorization")?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "Access denied. No token provided" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid token" });
//     }
//     req.user = user;
//     next();
//   });
// }

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (Replace <DB_URI> with your actual MongoDB URI)
mongoose.connect('mongodb+srv://rr7426151:zsRSnUEAifgdjIQ8@cluster0.mongodb.net?student retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('Error connecting to MongoDB Atlas:', err));


// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

// User model
const User = mongoose.model('User', userSchema);

// Route to update user profile
app.post('/update-profile', async (req, res) => {
  const { userId, name, email, password, confirmPassword } = req.body;

  // Input validation
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Find user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's data
    user.name = name;
    user.email = email;

    // If password is updated, hash the new password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save updated user information
    await user.save();

    return res.status(200).json({ message: 'Profile updated successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Port configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
