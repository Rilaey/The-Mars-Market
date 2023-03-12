import { gql } from '@apollo/client';

// PHONE NUMBER
export const QUERY_USER = gql`
  query user($id: String) {
    user(id: $_id) {
      firstName
      lastName
      username
      email
      phoneNumber
    }
  }
`;