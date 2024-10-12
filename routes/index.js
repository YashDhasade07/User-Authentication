// Importing required libraries
import express from 'express';
import passport from 'passport';
import {
  homepage,
  signupPage,
  loginPage,
  resetPage,
  destroySession,
  signup,
  reset,
  signin
} from '../controllers/userController.js';

const router = express.Router();

// Routes for home page
router.get('/home', homepage);

// Routes for signup page
router.get('/', signupPage);

// Routes for login page
router.get('/login', loginPage);

// Routes for reset password page
router.get('/reset', resetPage);

// Route for logout and destroying session
router.get('/logout', destroySession);

// Create a new user in the database
router.post('/signup', signup);

// Reset password
router.post('/reset', reset);

// Create a new session for user using Google OAuth
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/user/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect as needed
    res.redirect('/home'); // Redirect to home or another route
  }
);

// Create a new session for user using local authentication
router.post(
  '/signin',
  passport.authenticate('local', { failureRedirect: '/login' }),
  signin
);

export default router;
