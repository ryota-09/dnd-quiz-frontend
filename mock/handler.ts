import { graphql } from "msw";

export const handler = [
  graphql.query("GetWordList", (req, res, ctx) => {
    return res(
      ctx.data({
        words: [
          {
            __typename: "words",
            id: "cec80651-165a-444f-9bce-f577ed5a07c4",
            text: "テスト１",
            level: 1,
          },
          {
            __typename: "words",
            id: "cec80651-165a-444f-9bce-f577ed5a07c5",
            text: "テスト2",
            level: 2,
          },
          {
            __typename: "words",
            id: "cec80651-165a-444f-9bce-f577ed5a07c6",
            text: "テスト3",
            level: 3,
          },
        ],
      })
    );
  }),
];
