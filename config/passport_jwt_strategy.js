// Passport JWT Strategy for authenticating users using a JWT token
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';

// JWT options for extracting token and secret key
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: '4h9K1XfdeLlA'
};

// Configure the JWT strategy
passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findOne({ email: jwtPayload.email });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // Optionally, create a new account here if desired
      }
    } catch (error) {
      return done(error, false);
    }
  })
);
