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

// export const GET_WORDLIST_LOCAL = gql`
//   query GetWordList {
//     words @client {
//       id
//       text
//       level
//     }
//   }
// `;

export const CREATE_WORD = gql`
  mutation CreateWord($text: String!, $level: Number!) {
    createWord(word: { text: $text, level: $level }) {
      id
      text
      level
    }
  }
`;
