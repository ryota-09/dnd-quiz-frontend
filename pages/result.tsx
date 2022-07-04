import { NextPage } from "next";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";

import { useGameState } from "../hooks/useGameState";

const Result: NextPage = () => {
  const { gameState, setGameState } = useGameState();

  const calcTotalPoint = (
    trialTime: number,
    correctCount: number,
    vocabularyPoint: number
  ): number => {
    let timePoint: number;
    let correctPoint: number;
    let vocaPoint: number;
    // timePoint
    if (trialTime < 20) {
      timePoint = trialTime + 30;
    } else if (trialTime >= 20 && trialTime < 25) {
      timePoint = 10;
    } else {
      timePoint = 5;
    }

    // correctPoint
    if (correctCount < 3) {
      correctPoint = correctCount * 10;
    } else if (correctCount >= 3 && correctCount <= 4) {
      correctPoint = correctCount * 10 + 15;
    } else {
      correctPoint = 70;
    }
    // vocaPoint
    vocaPoint = vocabularyPoint;
    return timePoint + correctPoint + vocaPoint;
  };

  
  useEffect(() => {
    setGameState({
      type: "SET_GAMESTATE",
      payload: {
        gameState: {
          id: gameState.id,
          user_id: "ユーザーid",
          trial_time: gameState.trial_time,
          correct_count: gameState.correct_count,
          vocabulary_point: gameState.vocabulary_point,
          total_point: calcTotalPoint(
            gameState.trial_time,
            gameState.correct_count,
            gameState.vocabulary_point
          ),
          created_at: gameState.created_at,
          current_index: gameState.current_index,
          word_list: gameState.word_list,
        },
      },
    });
  }, []);
  return (
    <>
      <div>
        <div>結果発表</div>
        <p>{gameState.correct_count}</p>
        <p>{gameState.vocabulary_point}</p>
        <p>{gameState.total_point}</p>
      </div>
    </>
  );
};
export default Result;
