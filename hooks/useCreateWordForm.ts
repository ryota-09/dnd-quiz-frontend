import { FormEvent, useCallback, useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_WORD } from "../queries/queries";
import { CreateWordMutation } from "../types/generated/graphql";

export const useCreateWordForm = () => {
  const [text, setText] = useState("");
  const [level, setLevel] = useState("");
  const [textFormError, setTextFormError] = useState("");

  const [CreateWord] = useMutation<CreateWordMutation>(CREATE_WORD, {
    update(cache, { data: { createWord } }) {
      const cacheId = cache.identify(createWord);
      cache.modify({
        fields: {
          word(existingWord, { toReference }) {
            return existingWord;
          },
        },
      });
    },
  });
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await CreateWord({
        variables: {
          text: text,
          level: Number(level),
        },
      });
      setText("");
      setLevel("");
    } catch (error) {
      setTextFormError("【Error】" + error);
    }
  };
  return {
    text,
    level,
    textFormError,
    setText,
    setTextFormError,
    handleSubmit,
    setLevel,
  };
};
