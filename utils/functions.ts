import { v4 as uuid } from "uuid";

import { DraggableText } from "../types/types";

export const makeSlicedTextAray = (targetText: string): string[] => {
  let newArray: string[];
  newArray = targetText.split("");
  return newArray;
};

export const shuffleArray = (targetArray: string[]): string[] => {
  const copiedArray = targetArray.slice();
  for (let i = copiedArray.length - 1; i >= 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [copiedArray[i], copiedArray[rand]] = [copiedArray[rand], copiedArray[i]];
  }
  return copiedArray;
};

export const makeDraggableTextArray = (targetArray: string[]): DraggableText[] => {
  let newObj: DraggableText;
  let newArray: DraggableText[];
  for (let singleText of targetArray) {
    newObj = {
      id: uuid(),
      singleText: singleText,
    };
    newArray.push(newObj);
  }
  return newArray;
};
