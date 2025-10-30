const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, VerificationRequest } = require('../models');
const { sendVerificationEmail } = require('../utils/sendEmail');
const generateToken = require('../utils/generateToken');
require('dotenv').config();

const SALT_ROUNDS = 10;

exports.signup = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    if (!full_name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ full_name, email, password_hash, is_verified: false });

    const token = generateToken(32);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await VerificationRequest.create({
      user_id: user.user_id,
      token,
      expires_at: expiresAt,
      used: false
    });

    // send email
    await sendVerificationEmail(email, token);

    res.status(201).json({ message: 'User created. Check your email for verification link.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const v = await VerificationRequest.findOne({ where: { token } });
    if (!v) return res.status(400).json({ message: 'Invalid token' });
    if (v.used) return res.status(400).json({ message: 'Token already used' });
    if (new Date() > v.expires_at) return res.status(400).json({ message: 'Token expired' });

    const user = await User.findByPk(v.user_id);
    if (!user) return res.status(400).json({ message: 'User not found' });

    user.is_verified = true;
    await user.save();

    v.used = true;
    await v.save();

    res.json({ message: 'Email verified. You can now login.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    if (!user.is_verified) return res.status(403).json({ message: 'Email not verified' });

    const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });

    res.json({ token, user: { user_id: user.user_id, full_name: user.full_name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
