import express from "express";
import Comment from "../models/Comment.js";
const router = express.Router();

// GET all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("author") // Populate author with user details
      .populate("post"); // Populate post with post details
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new comment
router.post("/", async (req, res) => {
  const { text, post, author } = req.body;

  // Make sure that text, post, and author are provided
  if (!text || !post || !author) {
    return res
      .status(400)
      .json({ message: "text, post, and author are required." });
  }

  const comment = new Comment({
    text,
    post,
    author,
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update a comment
router.patch("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (comment == null) {
      return res.status(404).json({ message: "Cannot find comment" });
    }

    // Update the comment content if it's provided in the request body
    if (req.body.text != null) {
      comment.text = req.body.text;
    }

    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a comment
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment == null) {
      return res.status(404).json({ message: "Cannot find comment" });
    }

    await comment.deleteOne();
    res.json({ message: "Deleted Comment" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
