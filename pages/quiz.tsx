/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@apollo/client";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";
import { ReactNode, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { GetWordListQuery } from "../types/generated/graphql";
import { GET_WORDLIST } from "../queries/queries";
import DraggableArea from "../components/molcules/DraggableArea";
import Layout from "../components/organisms/Layout";
import { DraggableText, SingleQuiz } from "../types/types";
import { makeSingleQuiz, pickWords } from "../utils/functions";
import { useGameState } from "../hooks/useGameState";
import CountUpTimer from "../components/atoms/CountUpTimer";
import CountDownTimer from "../components/atoms/CountDownTimer";

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

const Quiz: React.FC = () => {
  const { data, error } = useQuery<GetWordListQuery>(GET_WORDLIST);
  const { gameState, setGameState } = useGameState();

  const [draggableTextList, setDraggableTextList] = useState<DraggableText[]>(
    []
  );
  const [quiz, setQuiz] = useState<SingleQuiz>();
  const [totalCount, setTotalCount] = useState(0);
  const [upTimer, setUpTimer] = useState(false);
  const [downCount, setDownCount] = useState(5);
  const [downTimer, setDownTimer] = useState(false);
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

  useEffect(() => {
    if (data) {
      let pickedWords = pickWords(data.words);
      setGameState({
        type: "SET_GAMESTATE",
        payload: {
          gameState: {
            id: uuid(),
            user_id: "",
            trial_time: 0,
            correct_count: 0,
            vocabulary_point: 0,
            total_point: 0,
            created_at: new Date(),
            current_index: 0,
            word_list: pickedWords,
          },
        },
      });
      let newQuiz = makeSingleQuiz(pickedWords[0].text);
      setQuiz(newQuiz);
      setDraggableTextList(newQuiz.splitedText);
    }
    // setUpTimer(true);
    // setDownTimer(true);
  }, [data]);

  useEffect(() => {
    let str: string = "";
    for (const text of draggableTextList) {
      str += text.singleText;
    }
    if (data && str === quiz.answerText) {
      let nextIndex = gameState.current_index + 1;
      setGameState({
        type: "SET_NEXT_INDEX",
        payload: {
          current_index: nextIndex,
        },
      });
      alert("正解");
      let newQuiz = makeSingleQuiz(gameState.word_list[nextIndex].text);
      setQuiz(newQuiz);
      setDraggableTextList(newQuiz.splitedText);
    }
  }, [draggableTextList]);

  return (
    <NoSSR>
      <Layout title="Home">
        <div className="flex justify-center items-center flex-col min-h-screen">
          <CountUpTimer totalCount={totalCount} setTotalCount={setTotalCount} upTimer={upTimer} /> 
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
        </div>
      </Layout>
    </NoSSR>
  );
};
export default Quiz;
