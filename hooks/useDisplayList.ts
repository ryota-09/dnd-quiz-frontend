import { useCallback, useState } from "react";
import { WordState } from "../types/types";

const useDisplayList = () => {
  const [resultWordList, setResultWordList] = useState<WordState[]>([]);
  const makeDisplayList = useCallback(
    (originList: WordState[], correctList: WordState[]) => {
      let targetList: WordState[] = [];
      let frag = false;
      for (const originOne of originList) {
        frag = false;
        for (const correctOne of correctList) {
          if (originOne === correctOne) {
            targetList.push(correctOne);
            frag = true;
          }
        }
        if (!frag) {
          targetList.push(originOne);
        }
      }
      console.log(targetList);
      setResultWordList([...targetList]);
    },
    [resultWordList]
  );
  return { resultWordList, makeDisplayList };
};
