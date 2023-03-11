const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/date");

const postSchema = new Schema({
  title: {
    type: String,
    required: "Post Must Have Title!",
    trim: true
  },
  description: {
    type: String,
    required: "Post Must Have Description!",
    trim: true
  },
  price: {
    type: Number,
    required: "Post Must Have Price!"
  },
  // need to figure how images work
  postImgs: {
    data: Buffer,
    contentType: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag"
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const Post = model("Post", postSchema);

module.exports = Post;
