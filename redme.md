# Node.js Authentication

## Description
A user authentication system built using Node.js, Express, Passport.js, and MongoDB. This project includes features like user signup, login, password reset, and Google OAuth2 integration for user authentication.

## Features
- User signup and login using email and password.
- Login using Google OAuth2.
- Password reset functionality.
- Flash messages for notifications.
- Protected routes for authenticated users.
- EJS templating for dynamic views with Bootstrap for styling.

## Prerequisites
- Node.js (v18 or above)
- MongoDB (local instance or MongoDB Atlas)
- Git

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/nodejs-authentication.git
   cd nodejs-authentication
Install dependencies:

bash

npm install
Create a .env file in the root directory:

Add the following environment variables:

makefile

PORT=3000
MONGO_URI=your_mongo_db_connection_string
SESSION_SECRET=your_secure_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
Replace your_mongo_db_connection_string, your_secure_session_secret, your_google_client_id, and your_google_client_secret with your actual values.

Run the MongoDB server: Ensure MongoDB is running locally or use MongoDB Atlas.

Usage
Start the server:

bash

npm start
Open your browser and go to:

arduino

http://localhost:3000
Signup, Login, and Reset Password:

Navigate to /signup to create a new account.
Navigate to /login for user login.
Use the /reset page to reset your password.
Google OAuth2 Login: Click the "Login with Google" button on the signup or login page to authenticate using Google.

Project Structure
bash

├── assets/                 # Static assets (CSS, images)
├── config/                 # Configuration files for Passport and Mongoose
├── controllers/            # Controller functions for handling routes
├── models/                 # Mongoose models (User)
├── routes/                 # Express routes
├── views/                  # EJS views for UI
├── .env                    # Environment variables
├── index.js                # Entry point for the application
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
Dependencies
express: Web framework for Node.js.
mongoose: ODM for MongoDB.
passport: Authentication middleware for Node.js.
passport-local: Local strategy for authentication using email and password.
passport-google-oauth: Google OAuth2 strategy for authentication.
express-session: Middleware for managing session.
connect-flash: Middleware for flash messages.
ejs: Templating engine for generating HTML.
crypto: For generating secure random passwords.