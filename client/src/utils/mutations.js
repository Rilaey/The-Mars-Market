import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SET_DARK_MODE = gql`
  mutation RemoveDarkMode($id: ID!) {
    removeDarkMode(_id: $id) {
      _id
      isDarkMode
    }
  }
`;

export const REMOVE_DARK_MODE = gql`
  mutation SetDarkMode($id: ID!) {
    setDarkMode(_id: $id) {
      _id
      isDarkMode
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $password: String!
    $username: String!
    $profilePicture: String
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      password: $password
      username: $username
      profilePicture: $profilePicture
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $_id: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $phoneNumber: String!
  ) {
    updateUser(
      _id: $_id
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      phoneNumber: $phoneNumber
    ) {
      _id
      firstName
      lastName
      email
      username
      phoneNumber
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      id
    }
  }
`;

export const ADD_PROFILE_PICTURE = gql`
  mutation addProfilePicture(
    $addProfilePictureId: ID!
    $profilePicture: String!
  ) {
    addProfilePicture(
      _id: $addProfilePictureId
      profilePicture: $profilePicture
    ) {
      profilePicture
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost(
    $user: ID!
    $title: String!
    $description: String!
    $price: Float!
    $paypalEmail: String!
    $postImgs: [String]!
  ) {
    createPost(
      user: $user
      title: $title
      description: $description
      price: $price
      paypalEmail: $paypalEmail
      postImgs: $postImgs
    ) {
      _id
      title
      price
      description
      paypalEmail
      postImgs
      user {
        _id
        firstName
        lastName
        email
        phoneNumber
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost(
    $updatePostId: ID!
    $title: String!
    $description: String!
    $price: Float!
  ) {
    updatePost(
      id: $updatePostId
      title: $title
      description: $description
      price: $price
    ) {
      title
      description
      price
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($deletePostId: ID!) {
    deletePost(id: $deletePostId) {
      _id
    }
  }
`;

export const CREATE_TAG = gql`
  mutation createTag($tagName: String!) {
    createTag(tagName: $tagName) {
      tagName
    }
  }
`;

export const DELETE_TAG = gql`
  mutation deleteTag($tagId: ID!) {
    deleteTag(tagId: $tagId) {
      success
      message
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation updateTag($tagId: ID!, $tagName: String!) {
    updateTag(tagId: $tagId, tagName: $tagName) {
      tag {
        tagName
      }
      success
      message
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($commentText: String!, $postId: ID!) {
    createComment(commentText: $commentText, postId: $postId) {
      id
      commentText
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($deleteCommentId: ID!) {
    deleteComment(id: $deleteCommentId) {
      id
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($updateCommentId: ID!, $commentText: String!) {
    updateComment(id: $updateCommentId, commentText: $commentText) {
      id
      commentText
    }
  }
`;
