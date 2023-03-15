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

export const CREATE_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $username: String!
    $phoneNumber: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      username: $username
      phoneNumber: $phoneNumber
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $username: String!
    $phoneNumber: String!
  ) {
    updateUser(
      id: $ID
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      username: $username
      phoneNumber: $phoneNumber
    ) {
      token
      user {
        _id
        username
      }
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
  mutation addProfilePicture($addProfilePictureId: ID!, $profilePicture: String!) {
    addProfilePicture(
      id: $addProfilePictureId
      profilePicture: $profilePicture
    ) {
      id
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($title: String!, $description: String!, $price: Float!) {
    createPost(title: $title, description: $description, price: $price) {
      title
      description
      price
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
      id
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
