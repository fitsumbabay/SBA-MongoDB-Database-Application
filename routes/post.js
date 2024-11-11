import express from "express";
import  Post  from "../models/post.js";
const router = express.Router();

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author"); // Populate author with user details
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new post
router.post("/", async (req, res) => {
  const { title, content, author } = req.body;

  // Ensure all required fields are provided
  if (!title || !content || !author) {
    return res
      .status(400)
      .json({ message: "Title, content, and author are required." });
  }

  const post = new Post({
    title,
    content,
    author,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update a post
router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }

    if (req.body.title != null) {
      post.title = req.body.title;
    }

    if (req.body.content != null) {
      post.content = req.body.content;
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }

    await post.deleteOne();
    res.json({ message: "Deleted Post" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
