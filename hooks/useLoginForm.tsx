import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import Cookies from "universal-cookie"

import { LOGIN_USER } from "../queries/queries";
import { LoginMutation } from "../types/generated/graphql";
import { setCurrentUser } from "../cache";
import { User } from "../types/types";

const cookie = new Cookies();

export const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textFormError, setTextFormError] = useState("");

  const [login] = useMutation<LoginMutation>(LOGIN_USER, {
    update(cache, { data: { login } }) {
      const cacheId = cache.identify(login);
      cache.modify({
        fields: {
          login(existingLogin, { toReference }) {
            return [toReference(cacheId), ...existingLogin];
          },
        },
      });

      cookie.set("user_id", login.user.id);
      cookie.set("access_token", login.access_token);
      cookie.set("refresh_token", login.refresh_token);
    },
  });
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login({
        variables: {
          email: email,
          password: password,
        },
      });
      setEmail("");
      setPassword("");
    } catch (error) {
      setTextFormError("【Error】" + error);
    }
  };
  return {
    email,
    password,
    textFormError,
    setEmail,
    setTextFormError,
    handleSubmit,
    setPassword,
  };
};
