import { REFRESH_TOKEN } from "../queries/queries";
import { initializeApollo } from "../lib/apolloClient";

import Cookies from "universal-cookie";

const cookie = new Cookies();

export const updateToken = async () => {
  let newAccessToken = "";
  let newRefreshToken = "";
  const client = initializeApollo();
  const data = await client.mutate({
    mutation: REFRESH_TOKEN,
    context: cookie.get("refresh_token"),
  });
  console.log("データ@@@@@@@@@@", data);
  newAccessToken = data.data.access_token;
  newRefreshToken = data.data.refresh_token;
  return { newAccessToken, newRefreshToken };
};
