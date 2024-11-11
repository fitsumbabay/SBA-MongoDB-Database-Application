import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate emails
      match: [/.+\@.+\..+/, "Please provide a valid email address"], // Validates email format with regex
    },
    password: {
      type: String,
      required: true,
      minlength: 6, 
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create an index 
userSchema.index({ username: 1 }); 

// Check if the model is already defined
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
