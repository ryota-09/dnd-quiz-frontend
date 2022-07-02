import { DraggableText } from "../types/types";

export const makeSlicedTextAray = (targetText: string): string[] => {
  let newArray: string[];
  newArray = targetText.split("");
  return newArray;
};

export const shuffleArray = (targetArray: string[]) => {
  const copiedArray = targetArray.slice();
  for (let i = copiedArray.length - 1; i >= 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [copiedArray[i], copiedArray[rand]] = [copiedArray[rand], copiedArray[i]];
  }

  return copiedArray;
};
