import express from 'express';
const router = express.Router();
import User from '../models/Authuser.js';

/* ======================
   TEST ENDPOINT
====================== */
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes working!' });
});

router.post('/test-body', (req, res) => {
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  res.json({ 
    message: 'Body test', 
    receivedBody: req.body,
    contentType: req.headers['content-type']
  });
});

/* ======================
   LOGIN WITH EMAIL
====================== */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Success
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/* ======================
   REGISTER NEW USER
====================== */
router.post('/register', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is missing. Make sure Content-Type is application/json' });
    }

    const { name, email, password } = req.body;

    // Validate
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    // Success
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// module.exports = router;
export default router;