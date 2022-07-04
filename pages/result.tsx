/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/organisms/Layout";

import { useGameState } from "../hooks/useGameState";

const Result: NextPage = () => {
  const { gameState, setGameState } = useGameState();

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

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
    if (correctCount === 5) {
      correctPoint = 70;
    } else if (correctCount >= 3 && correctCount <= 4) {
      correctPoint = correctCount * 5 + 15;
    } else {
      correctPoint = correctCount * 10;
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
      <Layout title="結果発表">
        <button
          className="inline-block bg-green-400 hover:bg-green-600 active:bg-indigo-700 focus-visible:ring ring-green-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          結果を表示する
        </button>
        <div className="flex justify-center items-center flex-col min-h-screen">
          {isOpen ? (
            <div>
              <p className="text-black-800 text-9xl md:text-4xl font-bold">
                タイム: {gameState.trial_time} s
              </p>
              <p className="text-black-800 text-9xl md:text-4xl font-bold">
                正解数: {gameState.correct_count} / 5
              </p>
              <p className="text-black-800 text-9xl md:text-4xl font-bold">
                語い力: {gameState.vocabulary_point} pt
              </p>
              <p className="text-red-800 text-9xl md:text-4xl font-bold">
                総合点: {gameState.total_point} pt
              </p>
              <button
          className="inline-block bg-green-400 hover:bg-green-600 active:bg-indigo-700 focus-visible:ring ring-green-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
          onClick={() => router.push("/quiz")}
        >
          リトライ
        </button>
            </div>
          ) : (
            <p>結果が表示されます</p>
          )}
        </div>
      </Layout>
    </>
  );
};
export default Result;
