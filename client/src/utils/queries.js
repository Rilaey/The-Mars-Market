import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      firstName
      lastName
      email
      phoneNumber
      username
      profilePicture
      posts {
        _id
        title
        description
        price
        postImgs
      }
    }
  }
`;

export const QUERY_USERS = gql`
query Users {
  users {
    _id
    phoneNumber
    email
    posts {
      title
      price
      description
      postImgs
      _id
    }
  }
}
`

export const QUERY_ALL_TAGS = gql`
  query getAllTags {
    getAllTags {
      _id
      tagName
    }
  }
`;

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(id: $id) {
      title
      description
      price
      postImgs
      user {
        _id
        phoneNumber
        email
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query posts {
    posts {
      _id
      title
      description
      price
      postImgs
      user {
        _id
      }
    }
  }
`;
