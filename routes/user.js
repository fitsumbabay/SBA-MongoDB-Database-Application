import express from "express";
import  User  from "../models/user.js";
const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new user
router.post("/", async (req, res) => {
  const { username, name, email, password } = req.body;

  // Ensure all required fields are provided
  if (!username || !name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }

  const user = new User({
    username,
    name,
    email,
    password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update a user
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }

    if (req.body.username != null) {
      user.username = req.body.username;
    }
       if (req.body.name != null) {
         user.name = req.body.name;
       }
    if (req.body.email != null) {
      user.email = req.body.email;
    }
    if (req.body.password != null) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }

    await user.deleteOne();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
