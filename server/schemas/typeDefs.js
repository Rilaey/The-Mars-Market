const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    username: String!
    phoneNumber: String!
    profilePicture: String
    createdAt: Date!
    posts: [Post!]
    comments: [Comment!]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Post {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    postImgs: [String]
    createdAt: String!
    tags: [Tag]!
    comments: [Comment]!
    user: User
  }

  type Image {
    data: String!
    contentType: String!
  }

  type Comment {
    id: ID!
    commentText: String!
    commentAuthor: User!
    createdAt: Date!
    post: Post!
  }

  type Tag {
    _id: ID!
    tagName: String!
    posts: [Post]!
  }

  type DeleteTagResponse {
    success: Boolean!
    message: String
  }

  type UpdateTagResponse {
    success: Boolean!
    message: String
    tag: Tag
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    username: String!
    phoneNumber: String!
  }

  type Query {
    user(_id: ID!): User
    users: [User!]
    posts: [Post!]
    post(id: ID!): Post
    getTagById(tagId: ID!): Tag
    getAllTags: [Tag!]!
    getComment(id: ID!): Comment
    getAllComments: [Comment]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(firstName: String!, lastName: String!, email: String!, phoneNumber: String!, password: String!, username: String!, profilePicture: String): Auth
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): User!
    addProfilePicture(_id: ID!, profilePicture: String!): User!
    createPost(
      title: String!
      description: String!
      price: Float!
      postImgs: [String!]
      tags: [ID!]
    ): Post!
    updatePost(
      id: ID!
      title: String!
      description: String!
      price: Float!
      tags: [ID!]
    ): Post
    deletePost(id: ID!): Post
    createTag(tagName: String!): Tag
    deleteTag(tagId: ID!): DeleteTagResponse!
    updateTag(tagId: ID!, tagName: String!): UpdateTagResponse!
    createComment(commentText: String!, postId: ID!): Comment
    deleteComment(id: ID!): Comment
    updateComment(id: ID!, commentText: String!): Comment
  }
`;

module.exports = typeDefs;
