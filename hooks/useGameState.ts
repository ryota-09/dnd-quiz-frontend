import { useContext } from "react";
import { gameStateContext, GameStateContextType } from "../providers/gameStateProvider";

export const useGameState = (): GameStateContextType => {
  return useContext(gameStateContext);
}
