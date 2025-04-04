// routes/admin.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Admin} from '../models/Admin.js';

const router = express.Router();
// const JWT_SECRET = 'your_secret_key'; // replace with your environment variable

// Signup route to create the admin (optional)
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if an admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(403).json({ message: 'Admin already exists' });
    }

    // Hash the password and save the admin
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin', error });
  }
});

// Login route for the admin
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the admin by username
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Check the password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token using the secret from environment variables
      const token = jwt.sign({ id: admin._id }, process.env.JSON_WEB_TOKEN_SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
});

export default router;
