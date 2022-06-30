import { gql } from "@apollo/client";

export const GET_WORDLIST = gql`
  query GetWordList {
    words {
      id
      text
      level
    }
  }
`;

export const GET_WORDLIST_LOCAL = gql`
  query GetWordList {
    words @client {
      id
      text
      level
    }
  }
`;
