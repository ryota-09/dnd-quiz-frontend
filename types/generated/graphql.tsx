import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CreateGameInput = {
  correct_count: Scalars['Float'];
  total_point: Scalars['Float'];
  trial_time: Scalars['Float'];
  user_id: Scalars['String'];
  vocabulary_point: Scalars['Float'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Game = {
  __typename?: 'Game';
  correct_count: Scalars['Float'];
  created_at: Scalars['DateTime'];
  id: Scalars['String'];
  total_point: Scalars['Float'];
  trial_time: Scalars['Float'];
  user_id: Scalars['String'];
  vocabulary_point: Scalars['Float'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String'];
  refresh_token: Scalars['String'];
  user: User;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createGame: Game;
  createUser: User;
  createWord: Word;
  login: LoginResponse;
  logout: Scalars['Boolean'];
  refreshToken: LoginResponse;
};


export type MutationCreateGameArgs = {
  gameInput: CreateGameInput;
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
};


export type MutationCreateWordArgs = {
  word: CreateWordInput;
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};

export type Query = {
  __typename?: 'Query';
  games: Array<Game>;
  getGameListByUerId: Array<Game>;
  getGamesTopThree: Array<Game>;
  oneUser: User;
  users: Array<User>;
  words: Array<Word>;
};


export type QueryGetGameListByUerIdArgs = {
  userId: Scalars['String'];
};


export type QueryOneUserArgs = {
  user: LoginUserInput;
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  img_path?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
};

export type Word = {
  __typename?: 'Word';
  id: Scalars['String'];
  level: Scalars['Float'];
  text: Scalars['String'];
};

export type CreateWordInput = {
  level: Scalars['Float'];
  text: Scalars['String'];
};

export type GetWordListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWordListQuery = { __typename?: 'Query', words: Array<{ __typename?: 'Word', id: string, text: string, level: number }> };

export type CreateWordMutationVariables = Exact<{
  text: Scalars['String'];
  level: Scalars['Float'];
}>;


export type CreateWordMutation = { __typename?: 'Mutation', createWord: { __typename?: 'Word', id: string, text: string, level: number } };

export type GetAllGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllGamesQuery = { __typename?: 'Query', games: Array<{ __typename?: 'Game', id: string, user_id: string, trial_time: number, correct_count: number, vocabulary_point: number, total_point: number, created_at: any }> };

export type GetGamesTopThreeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGamesTopThreeQuery = { __typename?: 'Query', getGamesTopThree: Array<{ __typename?: 'Game', id: string, user_id: string, trial_time: number, correct_count: number, vocabulary_point: number, total_point: number, created_at: any }> };

export type GetGamesByUserIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetGamesByUserIdQuery = { __typename?: 'Query', getGameListByUerId: Array<{ __typename?: 'Game',  id: string, user_id: string, trial_time: number, correct_count: number, vocabulary_point: number, total_point: number, created_at: any }> };

export type CreateGameMutationVariables = Exact<{
  user_id: Scalars['String'];
  trial_time: Scalars['Float'];
  correct_count: Scalars['Float'];
  vocabulary_point: Scalars['Float'];
  total_point: Scalars['Float'];
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: { __typename?: 'Game', id: string, user_id: string, trial_time: number, correct_count: number, vocabulary_point: number, total_point: number, created_at: any } };


export const GetWordListDocument = gql`
    query GetWordList {
  words {
    id
    text
    level
  }
}
    `;

/**
 * __useGetWordListQuery__
 *
 * To run a query within a React component, call `useGetWordListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWordListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWordListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWordListQuery(baseOptions?: Apollo.QueryHookOptions<GetWordListQuery, GetWordListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWordListQuery, GetWordListQueryVariables>(GetWordListDocument, options);
      }
export function useGetWordListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWordListQuery, GetWordListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWordListQuery, GetWordListQueryVariables>(GetWordListDocument, options);
        }
export type GetWordListQueryHookResult = ReturnType<typeof useGetWordListQuery>;
export type GetWordListLazyQueryHookResult = ReturnType<typeof useGetWordListLazyQuery>;
export type GetWordListQueryResult = Apollo.QueryResult<GetWordListQuery, GetWordListQueryVariables>;
export const CreateWordDocument = gql`
    mutation CreateWord($text: String!, $level: Float!) {
  createWord(word: {text: $text, level: $level}) {
    id
    text
    level
  }
}
    `;
export type CreateWordMutationFn = Apollo.MutationFunction<CreateWordMutation, CreateWordMutationVariables>;

/**
 * __useCreateWordMutation__
 *
 * To run a mutation, you first call `useCreateWordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWordMutation, { data, loading, error }] = useCreateWordMutation({
 *   variables: {
 *      text: // value for 'text'
 *      level: // value for 'level'
 *   },
 * });
 */
export function useCreateWordMutation(baseOptions?: Apollo.MutationHookOptions<CreateWordMutation, CreateWordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWordMutation, CreateWordMutationVariables>(CreateWordDocument, options);
      }
export type CreateWordMutationHookResult = ReturnType<typeof useCreateWordMutation>;
export type CreateWordMutationResult = Apollo.MutationResult<CreateWordMutation>;
export type CreateWordMutationOptions = Apollo.BaseMutationOptions<CreateWordMutation, CreateWordMutationVariables>;
export const GetAllGamesDocument = gql`
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

/**
 * __useGetAllGamesQuery__
 *
 * To run a query within a React component, call `useGetAllGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllGamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllGamesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllGamesQuery, GetAllGamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllGamesQuery, GetAllGamesQueryVariables>(GetAllGamesDocument, options);
      }
export function useGetAllGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllGamesQuery, GetAllGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllGamesQuery, GetAllGamesQueryVariables>(GetAllGamesDocument, options);
        }
export type GetAllGamesQueryHookResult = ReturnType<typeof useGetAllGamesQuery>;
export type GetAllGamesLazyQueryHookResult = ReturnType<typeof useGetAllGamesLazyQuery>;
export type GetAllGamesQueryResult = Apollo.QueryResult<GetAllGamesQuery, GetAllGamesQueryVariables>;
export const GetGamesTopThreeDocument = gql`
    query GetGamesTopThree {
  getGamesTopThree {
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

/**
 * __useGetGamesTopThreeQuery__
 *
 * To run a query within a React component, call `useGetGamesTopThreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGamesTopThreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGamesTopThreeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGamesTopThreeQuery(baseOptions?: Apollo.QueryHookOptions<GetGamesTopThreeQuery, GetGamesTopThreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGamesTopThreeQuery, GetGamesTopThreeQueryVariables>(GetGamesTopThreeDocument, options);
      }
export function useGetGamesTopThreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGamesTopThreeQuery, GetGamesTopThreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGamesTopThreeQuery, GetGamesTopThreeQueryVariables>(GetGamesTopThreeDocument, options);
        }
export type GetGamesTopThreeQueryHookResult = ReturnType<typeof useGetGamesTopThreeQuery>;
export type GetGamesTopThreeLazyQueryHookResult = ReturnType<typeof useGetGamesTopThreeLazyQuery>;
export type GetGamesTopThreeQueryResult = Apollo.QueryResult<GetGamesTopThreeQuery, GetGamesTopThreeQueryVariables>;
export const GetGamesByUserIdDocument = gql`
    query GetGamesByUserId($userId: String!) {
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

/**
 * __useGetGamesByUserIdQuery__
 *
 * To run a query within a React component, call `useGetGamesByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGamesByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGamesByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetGamesByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetGamesByUserIdQuery, GetGamesByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGamesByUserIdQuery, GetGamesByUserIdQueryVariables>(GetGamesByUserIdDocument, options);
      }
export function useGetGamesByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGamesByUserIdQuery, GetGamesByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGamesByUserIdQuery, GetGamesByUserIdQueryVariables>(GetGamesByUserIdDocument, options);
        }
export type GetGamesByUserIdQueryHookResult = ReturnType<typeof useGetGamesByUserIdQuery>;
export type GetGamesByUserIdLazyQueryHookResult = ReturnType<typeof useGetGamesByUserIdLazyQuery>;
export type GetGamesByUserIdQueryResult = Apollo.QueryResult<GetGamesByUserIdQuery, GetGamesByUserIdQueryVariables>;
export const CreateGameDocument = gql`
    mutation createGame($user_id: String!, $trial_time: Float!, $correct_count: Float!, $vocabulary_point: Float!, $total_point: Float!) {
  createGame(
    gameInput: {user_id: $user_id, trial_time: $trial_time, correct_count: $correct_count, vocabulary_point: $vocabulary_point, total_point: $total_point}
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
export type CreateGameMutationFn = Apollo.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      trial_time: // value for 'trial_time'
 *      correct_count: // value for 'correct_count'
 *      vocabulary_point: // value for 'vocabulary_point'
 *      total_point: // value for 'total_point'
 *   },
 * });
 */
export function useCreateGameMutation(baseOptions?: Apollo.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, options);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = Apollo.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = Apollo.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
