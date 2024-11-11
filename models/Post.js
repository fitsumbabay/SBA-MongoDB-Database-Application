import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Create an index 
postSchema.index({ title: 1 }); 
postSchema.index({ author: 1 }); 


const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
