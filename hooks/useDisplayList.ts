/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { WordState } from "../types/types";

export const useDisplayList = () => {
  const [resultWordList, setResultWordList] = useState<WordState[]>([]);
  const makeDisplayList = useCallback(
    (originList: WordState[], correctList: WordState[]) => {
      let targetList: WordState[] = [];
      let frag = false;
      for (const originOne of originList) {
        frag = false;
        for (const correctOne of correctList) {
          if (originOne.word.text === correctOne.word.text) {
            targetList.push(correctOne);
            frag = true;
          }
        }
        if (!frag) {
          targetList.push(originOne);
        }
      }
      setResultWordList([...targetList]);
    },
    []
  );
  return { resultWordList, makeDisplayList };
};
