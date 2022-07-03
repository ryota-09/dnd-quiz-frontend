import { createContext, Dispatch, FC, ReactNode, useReducer } from "react";
import { GameState } from "../types/types";

type State = {
  gameState: GameState;
};

type Action = {
  type: "SET_GAMESTATE" | "SET_NEXT_INDEX";
  payload: {
    gameState?: GameState;
    current_index?: number;
  };
};

export type GameStateContextType = {
  gameState: State;
  setGameState: Dispatch<Action>;
};

export const gameStateContext = createContext({} as GameStateContextType);

const initialState: State = {
  gameState: {
    id: "",
    user_id: "",
    trial_time: 0,
    correct_count: 0,
    vocabulary_point: 0,
    total_point: 0,
    created_at: null,
    current_index: 0,
    word_list: [],
  },
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_GAMESTATE":
      return { gameState: action.payload.gameState };
    case "SET_NEXT_INDEX":
      return {
        gameState: {
          ...state.gameState,
          current_index: action.payload.current_index,
        },
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
