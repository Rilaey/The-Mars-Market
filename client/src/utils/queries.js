import { gql } from '@apollo/client';

// PHONE NUMBER
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

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(id: $id) {
      title
      description
      price
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
      user {
        _id
      }
    }
  }
`;