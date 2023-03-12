import { gql } from '@apollo/client';

// PHONE NUMBER
export const QUERY_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      firstName
      lastName
      username
      email
      phoneNumber
    }
  }
`;