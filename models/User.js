// Importing Mongoose library for database operations
import mongoose from 'mongoose';

// Define the user schema for MongoDB
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model as the default export
export default User;
