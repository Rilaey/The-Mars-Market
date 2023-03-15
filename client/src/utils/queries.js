import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($userId: ID!) {
  user(id: $userId) {
    _id
    firstName
      lastName
      username
      email
      phoneNumber
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

export const QUERY_ALL_TAGS = gql`
query getAllTags {
  getAllTags {
    _id
    tagName
  }
}
`

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

