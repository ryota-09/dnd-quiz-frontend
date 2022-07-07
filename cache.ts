import { makeVar, useReactiveVar } from "@apollo/client";
import { GetWordListQuery, Word } from "./types/generated/graphql";

import { GameState, WordState } from "./types/types";

export const dbWordList = makeVar<Word[]>([]);

export const gameStateVar = makeVar<GameState>({
  id: "",
  user_id: "",
  trial_time: 0,
  correct_count: 0,
  vocabulary_point: 0,
  total_point: 0,
  created_at: null,
  current_index: 0,
  word_list: [],
  correct_list: [],
});

export const setGameState = (newGameState: GameState) => {
  gameStateVar(newGameState);
};

export const setNextIndex = (nextIndex: number) => {
  gameStateVar({ ...gameStateVar(), current_index: nextIndex });
};

export const setCorrectCount = (newCorrectCount: number) => {
  gameStateVar({ ...gameStateVar(), correct_count: newCorrectCount });
};

export const addBocabularyPoint = (newVocabularyPoint: number) => {
  gameStateVar({ ...gameStateVar(), vocabulary_point: newVocabularyPoint });
};

export const addCorrectList = (newCorrectWordList: WordState[]) => {
  gameStateVar({
    ...gameStateVar(),
    correct_list: [...newCorrectWordList],
  });
};
