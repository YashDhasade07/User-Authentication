// Importing required libraries
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
// If you're using bcrypt for password hashing, import it here
// import bcrypt from 'bcrypt';

// Authentication using passport.js with local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {

      try {
          // Find user and establish identity
          const user = await User.findOne({ email });
          console.log(user);
          
          // If no user found or password doesn't match, return an error
          if (!user  || !(await bcrypt.compare(password, user.password)) ) {
              req.flash('error', 'Invalid user/password');
              console.log('User does not exist in DB or password is incorrect');
              return done(null, false);
            }
           
            
        return done(null, user);
      } catch (error) {
        req.flash('error', error.message);
        console.log('Something went wrong', error);
        return done(error);
      }
    }
  )
);

// Serializing the user to decide which key is to be kept in cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    console.log('Error finding user in DB during deserialization', error);
    return done(error);
  }
});

// Check if the user is authenticated
export const checkAuthentication = (req, res, next) => {
  // If user is authenticated, pass the request to the next function (controller's action)
  if (req.isAuthenticated()) {
    console.log('User is authenticated');
    return next();
  }
  return res.redirect('/user/login');
};

// Set authenticated user for views
export const setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    // req.user contains the current signed-in user from the session cookie
    // we are just sending it to locals for the view
    res.locals.user = req.user;
  }
  next();
};

export default passport;
