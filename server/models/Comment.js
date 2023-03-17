const { Schema, model } = require('mongoose');
const dateFormat = require("../utils/date");

const commentSchema = new Schema({
    commentText: {
        type: String,
        required: "Comment Requires Characters!"
    },
    // might have to come back to this one.
    // trying to make it so the comment is assigned to the current user signed in.
    commentAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    post:
    {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
})

const Comment = model('Comment', commentSchema);

module.exports = Comment;