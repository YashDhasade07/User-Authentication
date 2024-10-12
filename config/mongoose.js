// Import the Mongoose library
import mongoose from 'mongoose';

// Create the MongoDB connection URL
// const dbURI = 'mongodb://127.0.0.1:27017/authentication';
const dbURI = 'mongodb+srv://yashnd20comp:2TeWE1Y5ItB5Ol0m@atlas.eytsn.mongodb.net/authentication';

// Connect to the MongoDB server with the provided URL
mongoose.connect(dbURI, {
  // Options can be added here if needed
});

// Get a reference to the default Mongoose connection
const db = mongoose.connection;

// Handle connection errors
db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

// Log successful connection
db.once('open', () => {
  console.log('Connected to Database :: MongoDB');
});

export default db;
