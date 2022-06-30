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
};

export type Query = {
  __typename?: 'Query';
  words: Array<Word>;
};

export type Word = {
  __typename?: 'Word';
  id: Scalars['String'];
  level: Scalars['Float'];
  text: Scalars['String'];
};

export type GetWordListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWordListQuery = { __typename?: 'Query', words: Array<{ __typename?: 'Word', id: string, text: string, level: number }> };


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