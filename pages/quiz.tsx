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
import { makeSingleQuiz } from "../utils/functions";
import { useGameState } from "../hooks/useGameState";

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
      
      let newQuiz = makeSingleQuiz(
        data.words[Math.floor(Math.random() * data.words.length)].text
      );
      setQuiz(newQuiz);
      setDraggableTextList(newQuiz.splitedText);
    }
  }, [data]);

  useEffect(() => {
    let str: string = "";
    for (const text of draggableTextList) {
      str += text.singleText;
    }
    if (data && str === quiz.answerText) {
      alert("正解");
    }
  }, [draggableTextList]);

  return (
    <NoSSR>
      <Layout title="Home">
        <div className="flex justify-center items-center flex-col min-h-screen">
          {/* {data && data.words.map((word) => <p key={word.id}>{word.text}</p>)} */}
          <br />
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppableId" direction="horizontal">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="flex">
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
