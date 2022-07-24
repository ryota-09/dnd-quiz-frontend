import { useMutation } from "@apollo/client";
import Cookies from "universal-cookie";

import { REFRESH_TOKEN } from "../queries/queries";
import { RefreshTokenMutation } from "../types/generated/graphql";

const cookie = new Cookies();

export const useUpdateToken = async (targetToken: string) => {
  const [updateRefreshToken] = useMutation<RefreshTokenMutation>(
    REFRESH_TOKEN,
    {
      update(cache, { data: { refreshToken } }) {
        const cacheId = cache.identify(refreshToken);
        cache.modify({
          fields: {
            login(existingRefreshToken, { toReference }) {
              return [toReference(cacheId), ...existingRefreshToken];
            },
          },
        });
        cookie.set("access_token", refreshToken.access_token);
        cookie.set("refresh_token", refreshToken.refresh_token);
        targetToken = refreshToken.refresh_token;
      },
    }
  );
  try {
    await updateRefreshToken();
  } catch (error) {
    console.log(error);
  }
  return targetToken;
};
