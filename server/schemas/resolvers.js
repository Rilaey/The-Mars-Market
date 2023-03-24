const { User, Post, Tag, Comment } = require("../models");
const { GraphQLScalarType, Kind } = require("graphql");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require("../utils/auth");

const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    serialize(value) {
      if (value instanceof Date) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
      }
      throw Error("GraphQL Date Scalar serializer expected a `Date` object");
    },
    parseValue(value) {
      if (typeof value === "number") {
        return new Date(value); // Convert incoming integer to Date
      }
      throw new Error("GraphQL Date Scalar parser expected a `number`");
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        // Convert hard-coded AST string to integer and then to Date
        return new Date(parseInt(ast.value, 10));
      }
      // Invalid hard-coded value (not an integer)
      return null;
    }
  }),
  Query: {
    user: async (parent, { _id }) => {
      return await User.findOne({ _id }).populate("posts").populate("comments");
    },
    users: async () => {
      return await User.find();
    },
    getTagById: async (parent, { tagId }) => {
      const tag = await Tag.findById(tagId);
      return tag;
    },
    getAllTags: async () => {
      const tags = await Tag.find();
      return tags;
    },
    posts: async () => {
      try {
        const posts = await Post.find().populate("user");
        return posts;
      } catch (err) {
        console.log(err);
      }
    },
    post: async (parent, { id }) => {
      const post = await Post.findById(id).populate("user");
      return post;
    },
    getComment: async (_, { id }) => {
      try {
        const comment = await Comment.findById(id);
        return comment;
      } catch (err) {
        console.error(err);
      }
    },
    getAllComments: async () => {
      try {
        const comments = await Comment.find();
        return comments;
      } catch (err) {
        console.error(err);
      }
    }
  },
  Mutation: {
    createUser: async (
      parent,
      { firstName, lastName, email, phoneNumber, password, username, profilePicture, isAdmin, isDarkMode }
    ) => {
      const user = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        username,
        profilePicture,
        isAdmin,
        isDarkMode
      });
      const token = signToken(user);
      await user.save();
      return { user, token };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, { id, input }) => {
      const user = await User.findByIdAndUpdate(id, input, { new: true });
      return user;
    },
    updateUser: async (parent, { _id, firstName, lastName, phoneNumber, email, username }) => {
      const user = await User.findOne({ _id });
      user.firstName = firstName
      user.lastName = lastName
      user.phoneNumber = phoneNumber
      user.email = email
      user.username = username
      await user.save()
      return user;
    },
    addProfilePicture: async (parent, { _id, profilePicture }) => {
      const user = await User.findOne({ _id });
      user.profilePicture = profilePicture;
      await user.save();
      return user;
    },
    darkMode: async (parent, { _id, isDarkMode }) => {
      const user = await User.findOne({ _id });

      user.isDarkMode = true

      await user.save()
      return user
    },
    createTag: async (parent, { tagName }) => {
      const tag = new Tag({ tagName: tagName });
      await tag.save();
      return tag;
    },
    deleteTag: async (parent, { tagId }) => {
      try {
        const tag = await Tag.findByIdAndDelete(tagId);
        if (!tag) {
          return {
            success: false,
            message: "Tag not found"
          };
        }
        return {
          success: true,
          message: "Tag deleted successfully"
        };
      } catch (err) {
        return {
          success: false,
          message: err.message
        };
      }
    },
    updateTag: async (parent, { tagId, tagName }) => {
      try {
        const tag = await Tag.findByIdAndUpdate(
          tagId,
          { tagName },
          { new: true }
        );
        if (!tag) {
          return {
            success: false,
            message: "Tag not found"
          };
        }
        return {
          success: true,
          message: "Tag updated successfully",
          tag
        };
      } catch (err) {
        return {
          success: false,
          message: err.message
        };
      }
    },
    createPost: async (parent, { title, description, price, tags, postImgs, user }, context) => {
      const post = await Post.create({
        title,
        description,
        price,
        tags,
        postImgs,
        user
      });

      await User.findOneAndUpdate(
        { _id: user},
        { $addToSet: { posts: post._id } }
      );

      return post;
    },
    updatePost: async (parent, args) => {
      const { id, title, description, price, tags } = args;
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { title, description, price, tags },
        { new: true }
      );
      return updatedPost;
    },
    deletePost: async (parent, { id }) => {
      const deletedPost = await Post.findByIdAndDelete(id);
      return deletedPost;
    },
    createComment: async (_, { commentText, postId }, { user }) => {
      if (!user) {
        throw new AuthenticationError(
          "You must be logged in to create a comment."
        );
      }

      try {
        const post = await Post.findById(postId);

        if (!post) {
          throw new Error("No post with that id found.");
        }

        const newComment = new Comment({
          commentText,
          commentAuthor: User._id,
          createdAt: Date.now()
        });

        await newComment.save();
        post.comments.push(newComment);
        await post.save();

        return newComment;
      } catch (err) {
        console.error(err);
      }
    },
    deleteComment: async (_, { id }, { user }) => {
      if (!user) {
        throw new AuthenticationError(
          "You must be logged in to delete a comment."
        );
      }

      try {
        const comment = await Comment.findById(id);

        if (!comment) {
          throw new Error("No comment with that id found.");
        }

        if (comment.commentAuthor !== User._id) {
          throw new AuthenticationError(
            "You can only delete your own comments."
          );
        }

        await comment.remove();

        return comment;
      } catch (err) {
        console.error(err);
      }
    },
    updateComment: async (_, { id, commentText }, { user }) => {
      if (!user) {
        throw new AuthenticationError(
          "You must be logged in to update a comment."
        );
      }

      try {
        const comment = await Comment.findById(id);

        if (!comment) {
          throw new Error("No comment with that id found.");
        }

        if (comment.commentAuthor !== User._id) {
          throw new AuthenticationError(
            "You can only update your own comments."
          );
        }

        comment.commentText = commentText;
        comment.createdAt = Date.now();

        await comment.save();

        return comment;
      } catch (err) {
        console.error(err);
      }
    }
  },
  Tag: {
    posts: async (tag) => {
      const posts = await Post.find({ tags: tag.id });
      return posts;
    }
  },
  User: {
    posts: async (user) => {
      const posts = await Post.find({ user: user.id });
      return posts;
    },
    comments: async (parent) => {
      return await Comment.find({ commentAuthor: parent.id });
    }
  },
  Post: {
    user: async (post) => {
      return await User.findById(post.user);
    },
    comments: async (parent) => {
      return await Comment.find({ post: parent.id });
    }
  },
  Comment: {
    commentAuthor: async (parent) => {
      try {
        const user = await User.findById(parent.commentAuthor);
        return user;
      } catch (err) {
        console.error(err);
      }
    },
    post: async (comment) => {
      const post = await Post.findById(comment.post);
      return post;
    }
  }
};

module.exports = resolvers;
