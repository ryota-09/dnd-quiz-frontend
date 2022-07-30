/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery, useReactiveVar } from "@apollo/client";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";
import { ReactNode, useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import { clsx } from "clsx";

import { GetWordListQuery } from "../types/generated/graphql";
import { GET_WORDLIST } from "../queries/queries";
import DraggableArea from "../components/molcules/DraggableArea";
import Layout from "../components/organisms/Layout";
import {
  DraggableText,
  GameState,
  SingleQuiz,
  WordState,
} from "../types/types";
import { makeSingleQuiz, pickWords } from "../utils/functions";
import CountUpTimer from "../components/atoms/CountUpTimer";
import CountDownTimer from "../components/atoms/CountDownTimer";
import CountSimpleTimer from "../components/atoms/SimpleTimer";
import {
  dbWordList,
  setGameState,
  setNextIndex,
  setCorrectCount,
  addCorrectList,
  addBocabularyPoint,
  gameStateVar,
} from "../cache";

// react-beautiful-dndのエラーの解消のため
type SafeHydrateProps = {
  children: ReactNode;
};

const NoSSR = ({ children }: SafeHydrateProps) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? <p>ロード中...</p> : children}
    </div>
  );
};

const Quiz: NextPage = () => {
  const { data, error } = useQuery<GetWordListQuery>(GET_WORDLIST);
  if (data) {
    dbWordList([...data.words]);
  }
  const currentGameState = useReactiveVar(gameStateVar);
  const router = useRouter();

  const [draggableTextList, setDraggableTextList] = useState<DraggableText[]>(
    []
  );
  const [quiz, setQuiz] = useState<SingleQuiz>();
  const [displayText, setDisplayText] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [upTimer, setUpTimer] = useState(false);
  const [downCount, setDownCount] = useState(10);
  const [downTimer, setDownTimer] = useState(false);
  const [simpleCount, setSimpleCount] = useState(3);
  const [simpleTimer, setSimpleTimer] = useState(false);

  if (error) {
    console.log("エラー", error.message);
  }

  const reorder = (
    list: DraggableText[],
    startIndex: number,
    endIndex: number
  ): DraggableText[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    // ドロップ先がない
    if (!result.destination) {
      return;
    }
    // 配列の順序を入れ替える
    let movedItems = reorder(
      draggableTextList, //　順序を入れ変えたい配列
      result.source.index, // 元の配列の位置
      result.destination.index // 移動先の配列の位置
    );
    setDraggableTextList(movedItems);
  };

  const calcTotalVocabularyPoint = (index: number): number => {
    return (
      currentGameState.vocabulary_point +
      currentGameState.word_list[index].word.level
    );
  };

  useEffect(() => {
    if (data) {
      let pickedWords = pickWords(data.words);
      let initGameState = {
        id: uuid(),
        user_id: "",
        trial_time: 0,
        correct_count: 0,
        vocabulary_point: 0,
        total_point: 0,
        created_at: new Date(),
        current_index: 0,
        word_list: pickedWords,
        correct_list: [],
      };
      // キャッシュに保存
      setGameState(initGameState);
      let newQuiz = makeSingleQuiz(pickedWords[0].word.text);
      setQuiz(newQuiz);
      setDraggableTextList(newQuiz.splitedText);
    }
    setSimpleTimer(true);
  }, [data]);

  useEffect(() => {
    let str: string = "";
    for (const text of draggableTextList) {
      str += text.singleText;
    }
    if (data && quiz && str === quiz.answerText) {
      setDisplayText("正解");
      let targetWordState = {
        isCorrect: true,
        word: currentGameState.word_list[currentGameState.current_index].word,
      };
      let targetWordStateList = [
        ...currentGameState.correct_list,
        targetWordState,
      ];
      addCorrectList(targetWordStateList as WordState[]);
      let nextCorrectCount = currentGameState.correct_count + 1;
      setCorrectCount(nextCorrectCount);
      let nextVocaPoint = calcTotalVocabularyPoint(
        currentGameState.current_index
      );
      addBocabularyPoint(nextVocaPoint);
      let nextIndex = currentGameState.current_index + 1;
      setNextIndex(nextIndex);
      try {
        let newQuiz = makeSingleQuiz(
          currentGameState.word_list[nextIndex].word.text
        );
        setQuiz(newQuiz);
        setDraggableTextList(newQuiz.splitedText);
        setDownCount(10);
        setTimeout(() => {
          setDisplayText("");
        }, 1000);
      } catch {
        let finishGameState = {
          id: currentGameState.id,
          user_id: "ユーザーid",
          trial_time: totalCount,
          correct_count: nextCorrectCount,
          vocabulary_point: nextVocaPoint,
          total_point: 0,
          created_at: currentGameState.created_at,
          current_index: nextIndex,
          word_list: currentGameState.word_list,
          correct_list: [...currentGameState.correct_list, targetWordState],
        };
        setGameState(finishGameState as GameState);
        router.push("/result");
      }
    }
  }, [draggableTextList]);

  useEffect(() => {
    if (downCount <= 0) {
      setDisplayText("タイムアップ！");
      let nextIndex = currentGameState.current_index + 1;
      setNextIndex(nextIndex);
      try {
        let newQuiz = makeSingleQuiz(
          currentGameState.word_list[nextIndex].word.text
        );
        setQuiz(newQuiz);
        setDraggableTextList(newQuiz.splitedText);
        setDownCount(10);
        setTimeout(() => {
          setDisplayText("");
        }, 1000);
      } catch {
        let finishGameState = {
          id: currentGameState.id,
          user_id: "ユーザーid",
          trial_time: totalCount,
          correct_count: currentGameState.correct_count,
          vocabulary_point: currentGameState.vocabulary_point,
          total_point: 0,
          created_at: currentGameState.created_at,
          current_index: nextIndex,
          word_list: currentGameState.word_list,
          correct_list: [...currentGameState.correct_list],
        };
        setGameState(finishGameState);
        router.push("/result");
      }
    }
  }, [downCount]);

  useEffect(() => {
    if (simpleCount === 0) {
      setSimpleTimer(false);
      setUpTimer(true);
      setDownTimer(true);
    }
  }, [simpleCount]);

  return (
    <NoSSR>
      <Layout title="Home">
        <div
          className={clsx(
            "flex flex-col min-h-screen",
            simpleCount > 0 && "justify-center"
          )}
        >
          {simpleTimer ? (
            <CountSimpleTimer
              simpleCount={simpleCount}
              setSimpleCount={setSimpleCount}
              simpleTimer={simpleTimer}
            />
          ) : (
            <>
              <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
                \ Playing Quiz Now ! /
              </h2>
              <CountUpTimer
                totalCount={totalCount}
                setTotalCount={setTotalCount}
                upTimer={upTimer}
              />
              <CountDownTimer
                downCount={downCount}
                setDownCount={setDownCount}
                downTimer={downTimer}
              />
              <br />
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppableId" direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex"
                    >
                      {draggableTextList.map((text, index) => (
                        <div key={text.id}>
                          <DraggableArea index={index} text={text} />
                        </div>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <br />
              {displayText === "正解" && (
                <div className="flex justify-center items-center mt-10">
                  <span className="text-2xl font-bold text-center text-black-500 text-7xl font-bold">
                    {displayText}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              )}
              {displayText === "タイムアップ！" && (
                <div className="flex justify-center items-center mt-10">
                  <span className="text-2xl font-bold text-center text-black-500 text-7xl font-bold">
                    {displayText}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </>
          )}
        </div>
      </Layout>
    </NoSSR>
  );
};
export default Quiz;
