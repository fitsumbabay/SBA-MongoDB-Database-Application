import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

const seedData = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log("MongoDB connected");

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    // Create sample users, posts, and comments here...
    console.log("Sample data populated");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error while seeding data:", err);
  }
};

export default seedData;
