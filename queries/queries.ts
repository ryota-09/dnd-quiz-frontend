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
  mutation CreateWord($text: String!, $level: Float!) {
    createWord(word: { text: $text, level: $level }) {
      id
      text
      level
    }
  }
`;

export const GET_ALL_GAMES = gql`
  query GetAllGames {
    games {
      id
      user_id
      trial_time
      correct_count
      vocabulary_point
      total_point
      created_at
    }
  }
`;

export const GET_GAMES_TOP_THREE = gql`
  query GetGamesTopThree {
    games(first: 3) {
      id
      user_id
      trial_time
      correct_count
      vocabulary_point
      total_point
      created_at
    }
  }
`;

export const GET_GAMES_BY_USERID = gql`
  query GetGamesByUserId($userId: uuid!) {
    getGameListByUerId(userId: $userId) {
      id
      user_id
      trial_time
      correct_count
      vocabulary_point
      total_point
      created_at
    }
  }
`;

export const CREATE_GAME = gql`
  mutation createGame(
    $user_id: uuid!
    $trial_time: Float!
    $correct_count: Float!
    $vocabulary_point: Float!
    $total_point: Float!
  ) {
    createGame(
      gameInput: {
        user_id: $user_id
        trial_time: $trial_time
        correct_count: $correct_count
        vocabulary_point: $vocabulary_point
        total_point: $total_point
      }
    ) {
      id
      user_id
      trial_time
      correct_count
      vocabulary_point
      total_point
      created_at
    }
  }
`;
