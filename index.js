
import express from 'express';
import session from 'express-session';
import expressLayouts from 'express-ejs-layouts';
import db from './config/mongoose.js';
import passport, { setAuthenticatedUser } from './config/passport_local_strategy.js';
import './config/passport-google-oauth2-strategy.js'; // Ensure this is imported if needed
import flash from 'connect-flash';
import { setFlash } from './config/middleware.js';
import routes from './routes/index.js';

const app = express();
const PORT = 3000;

// Middleware for layouts
app.use(expressLayouts);

// Serve static files from the "assets" directory
app.use(express.static('./assets'));

// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    name: 'nodejs_auth',
    secret: 'secureSecretKey',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, // Cookie expiration time in milliseconds
    },
  })
);

// Initialize passport for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(setAuthenticatedUser);

// Flash messages middleware
app.use(flash());
app.use(setFlash);

// Use express router for routes
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
