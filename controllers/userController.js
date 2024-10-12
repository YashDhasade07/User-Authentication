// Importing the User model
import User from '../models/User.js';
import bcrypt from 'bcrypt';

// Rendering the home page
export const homepage = (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('home');
  }
  return res.redirect('/login');
};

// Rendering the signup page
export const signupPage = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/home');
  }
  return res.render('signup');
};

// Rendering the login page
export const loginPage = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/home');
  }
  return res.render('login');
};

// Rendering the reset password page
export const resetPage = (req, res) => {
  return res.render('reset_password');
};

// Signup function
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    // Check if password matches confirm password
    if (password !== confirmPassword) {
      req.flash('error', 'Password and confirm password do not match');
      return res.redirect('/');
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'User already exists');
      console.log('User already exists');
      return res.redirect('/');
    }
    const hashedPassword =await bcrypt.hash(password,12)
    // Create new user
    const newUser = await User.create({ name, email, password: hashedPassword });
    req.flash('success', 'User signed up successfully');
    return res.redirect('/login');
  } catch (error) {
    console.log('Oops! Something went wrong', error);
    return res.redirect('/signup');
  }
};

// Signin function
export const signin = async (req, res) => {
  req.flash('success', 'User logged in successfully');
  console.log('User logged in successfully');
  return res.redirect('/home');
};

// Password reset function 
export const reset = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error', 'User does not exist');
      console.log('User does not exist');
      return res.redirect('/reset');
    }

    // Check if the current password matches
    if (user.password !== oldPassword) {
      req.flash('error', 'Current password does not match');
      console.log('Current password does not match');
      return res.redirect('/reset');
    }

    // Update the password
    user.password = newPassword;
    await user.save();

    req.flash('success', 'Password updated successfully');
    console.log('Password updated successfully');
    return res.redirect('/login');
  } catch (error) {
    console.log('Error during password reset', error);
    return res.redirect('/reset');
  }
};

// Destroy the session
export const destroySession = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    req.flash('success', 'You have logged out');
    return res.redirect('/');
  });
};
