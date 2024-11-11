import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Create indexes explicitly in the schema
commentSchema.index({ post: 1 });  // Index for post
commentSchema.index({ author: 1 });  // Index for author

// Check if the Comment model is already defined to avoid overwriting it
const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;
