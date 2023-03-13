import { gql } from '@apollo/client';

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

export const QUERY_ALL_TAGS = gql`
query getAllTags {
  getAllTags {
    tagName
  }
}
`