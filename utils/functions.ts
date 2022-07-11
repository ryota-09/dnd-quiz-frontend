
import { v4 as uuid } from "uuid";

import {
  DraggableText,
  SingleQuiz,
  Word,
  WordState,
} from "../types/types";

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

export const makeDraggableTextArray = (
  targetArray: string[]
): DraggableText[] => {
  let newObj: DraggableText;
  let newArray: DraggableText[] = [];
  for (let singleText of targetArray) {
    newObj = {
      id: uuid(),
      singleText: singleText,
    };
    newArray.push(newObj);
  }
  return newArray;
};

export const makeSingleQuiz = (
  targetText: string,
  index?: number
): SingleQuiz => {
  let newQuiz: SingleQuiz = {
    index: 0,
    answerText: "",
    splitedText: [],
  };
  let slicedTextArray = makeSlicedTextAray(targetText);
  let shuffledArray = shuffleArray(slicedTextArray);
  let newDraggableTextArray = makeDraggableTextArray(shuffledArray);
  newQuiz = {
    index: index,
    answerText: targetText,
    splitedText: newDraggableTextArray,
  };
  return newQuiz;
};

const randomFiveNum = (textArray: Word[]): number[] => {
  let num1 = 0;
  let num2 = 0;
  let num3 = 0;
  let num4 = 0;
  let num5 = 0;
  do {
    const randomNum1 = Math.floor(Math.random() * textArray.length);
    const randomNum2 = Math.floor(Math.random() * textArray.length);
    const randomNum3 = Math.floor(Math.random() * textArray.length);
    const randomNum4 = Math.floor(Math.random() * textArray.length);
    const randomNum5 = Math.floor(Math.random() * textArray.length);

    num1 = randomNum1;
    num2 = randomNum2;
    num3 = randomNum3;
    num4 = randomNum4;
    num5 = randomNum5;
  } while (
    num1 === num2 ||
    num1 === num3 ||
    num1 === num4 ||
    num1 === num5 ||
    num2 === num3 ||
    num2 === num4 ||
    num2 === num5 ||
    num3 === num4 ||
    num3 === num5 ||
    num4 === num5
  );
  return [num1, num2, num3, num4, num5];
};

export const pickWords = (textArray: Word[]): WordState[] => {
  let newArray: WordState[] = [];
  let randomNumArray = randomFiveNum(textArray);
  for (let randomNum of randomNumArray) {
    for (let i = 0; i < textArray.length; i++) {
      if (i === randomNum) {
        newArray.push({ isCorrect: false, word: textArray[i] });
      }
    }
  }
  return newArray;
};
