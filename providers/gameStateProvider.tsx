import { createContext, Dispatch, FC, ReactNode, useReducer } from "react";
import { GameState, Word } from "../types/types";

type State = {
  id: string;
  user_id: string;
  trial_time: number;
  correct_count: number;
  vocabulary_point: number;
  total_point: number;
  created_at: Date;
  current_index: number;
  word_list: Word[];
};

type Action = {
  type: "SET_GAMESTATE" | "SET_NEXT_INDEX" | "SET_CORRECT_COUNT";
  payload: {
    gameState?: GameState;
    current_index?: number;
    correct_count?: number;
  };
};

export type GameStateContextType = {
  gameState: State;
  setGameState: Dispatch<Action>;
};

export const gameStateContext = createContext({} as GameStateContextType);

const initialState: State = {
  id: "",
  user_id: "",
  trial_time: 0,
  correct_count: 0,
  vocabulary_point: 0,
  total_point: 0,
  created_at: null,
  current_index: 0,
  word_list: [],
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_GAMESTATE":
      return { ...action.payload.gameState };
    case "SET_NEXT_INDEX":
      return {
        ...state,
        current_index: action.payload.current_index,
      };
      case "SET_CORRECT_COUNT":
        return {
          ...state,
          correct_count : action.payload.correct_count,
        };
    default:
      return state;
  }
};

type Props = {
  children: ReactNode;
};

export const GameStateProvider: FC<Props> = ({ children }) => {
  const [gameState, setGameState] = useReducer(reducer, initialState);
  return (
    <gameStateContext.Provider value={{ gameState, setGameState }}>
      {children}
    </gameStateContext.Provider>
  );
};
