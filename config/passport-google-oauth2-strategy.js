// Importing required libraries
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import crypto from 'crypto';
import User from '../models/User.js';

// Configure passport to use a new strategy for Google login
passport.use(
  new GoogleStrategy(
    {
      clientID: '568818836495-vcck0lc3jgaqb4uft6t7oo3qm5rdtndg.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/user/auth/google/callback',
      passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        // Find user by email from Google profile
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          return done(null, user);
        }

        // If user not found, create a new user with a random password
        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString('hex')
        });

        if (newUser) {
          return done(null, newUser);
        }
      } catch (error) {
        console.log('Error in Google strategy passport', error);
        return done(error, false);
      }
    }
  )
);

export default passport;
