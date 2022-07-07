/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Layout from "../components/organisms/Layout";
import { useGameState } from "../hooks/useGameState";
import ResultRadarChart from "../components/organisms/ResultRadarChart";
import { useDisplayList } from "../hooks/useDisplayList";
import { useReactiveVar } from "@apollo/client";
import { gameStateVar, setGameState } from "../cache";

const Result: NextPage = () => {
  // const { gameState, setGameState } = useGameState();
  const { resultWordList, makeDisplayList } = useDisplayList();
  const currentGameState = useReactiveVar(gameStateVar);
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
      timePoint = trialTime + 60;
    } else if (trialTime >= 20 && trialTime < 40) {
      timePoint = trialTime + 20;
    } else {
      timePoint = 10;
    }

    // correctPoint
    if (correctCount === 5) {
      correctPoint = 100;
    } else if (correctCount >= 3 && correctCount <= 4) {
      correctPoint = correctCount * 20;
    } else {
      correctPoint = correctCount * 20;
    }
    // vocaPoint
    vocaPoint = vocabularyPoint * 2;
    return timePoint + correctPoint + vocaPoint;
  };

  useEffect(() => {
    makeDisplayList(currentGameState.word_list, currentGameState.correct_list);
    let resultGameState = {
      id: currentGameState.id,
      user_id: "ユーザーid",
      trial_time: currentGameState.trial_time,
      correct_count: currentGameState.correct_count,
      vocabulary_point: currentGameState.vocabulary_point,
      total_point: calcTotalPoint(
        currentGameState.trial_time,
        currentGameState.correct_count,
        currentGameState.vocabulary_point
      ),
      created_at: currentGameState.created_at,
      current_index: currentGameState.current_index,
      word_list: currentGameState.word_list,
      correct_list: currentGameState.correct_list,
    };
    setGameState(resultGameState);
    console.log(currentGameState);
    // setGameState({
    //   type: "SET_GAMESTATE",
    //   payload: {
    //     gameState: {
    //       id: currentGameState.id,
    //       user_id: "ユーザーid",
    //       trial_time: currentGameState.trial_time,
    //       correct_count: currentGameState.correct_count,
    //       vocabulary_point: currentGameState.vocabulary_point,
    //       total_point: calcTotalPoint(
    //         currentGameState.trial_time,
    //         currentGameState.correct_count,
    //         currentGameState.vocabulary_point
    //       ),
    //       created_at: currentGameState.created_at,
    //       current_index: currentGameState.current_index,
    //       word_list: currentGameState.word_list,
    //       correct_list: currentGameState.correct_list,
    //     },
    //   },
    // });
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
            <div className="flex">
              <div>
                <p className="text-black-800 text-9xl md:text-4xl font-bold">
                  タイム: {currentGameState.trial_time} s
                </p>
                <p className="text-black-800 text-9xl md:text-4xl font-bold">
                  正解数: {currentGameState.correct_count} / 5
                </p>
                <p className="text-black-800 text-9xl md:text-4xl font-bold">
                  語い力: {currentGameState.vocabulary_point} pt
                </p>
                <p className="text-red-800 text-9xl md:text-4xl font-bold">
                  総合点: {currentGameState.total_point} pt
                </p>
                <button
                  className="inline-block bg-green-400 hover:bg-green-600 active:bg-indigo-700 focus-visible:ring ring-green-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                  onClick={() => router.push("/quiz")}
                >
                  リトライ
                </button>
                {resultWordList.map((word, index) => (
                  <div key={index}>
                    <span>
                      {index + 1}: {word.word.text} 結果:
                      {word.isCorrect ? "⭕️" : "❌"}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <ResultRadarChart
                  trialTime={currentGameState.trial_time}
                  correctCount={currentGameState.correct_count}
                  vocabularyPoint={currentGameState.vocabulary_point}
                />
              </div>
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
