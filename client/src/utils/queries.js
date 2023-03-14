import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
      firstName
      lastName
      username
      email
      phoneNumber
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
