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
      // const newUser: User = {
      //   id: login.user.id,
      //   user_name: login.user.username,
      //   email: login.user.email,
      //   password: login.user.password,
      //   img_path: login.user.img_path,
      //   created_at: login.user.created_at,
      //   updated_at: login.user.updated_at,
      //   game_history: [],
      // };
      // setCurrentUser(newUser);
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
