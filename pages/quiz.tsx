import { useQuery } from "@apollo/client";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";
import { ReactNode, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { GetWordListQuery } from "../types/generated/graphql";
import { GET_WORDLIST } from "../queries/queries";
import DraggableArea from "../components/molcules/DraggableArea";
import Layout from "../components/organisms/Layout";

export type DraggableText = {
  id: string;
  draggableId: string;
  singleText: string;
};

type SafeHydrateProps = {
  children: ReactNode;
};

const NoSSR = ({ children }: SafeHydrateProps) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
};

const dummyArray: DraggableText[] = [
  {
    id: uuid(),
    draggableId: uuid(),
    singleText: "さ",
  },
  {
    id: uuid(),
    draggableId: uuid(),
    singleText: "ん",
  },
  {
    id: uuid(),
    draggableId: uuid(),
    singleText: "ぼ",
  },
  {
    id: uuid(),
    draggableId: uuid(),
    singleText: "く",
  },
  {
    id: uuid(),
    draggableId: uuid(),
    singleText: "ら",
  },
];

const Quiz: React.FC = () => {
  const { data, error } = useQuery<GetWordListQuery>(GET_WORDLIST);
  const [textList, setTextList] = useState<DraggableText[]>(dummyArray);
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
      textList, //　順序を入れ変えたい配列
      result.source.index, // 元の配列の位置
      result.destination.index // 移動先の配列の位置
    );
    setTextList(movedItems);
  };

  useEffect(() => {
    let str: string = "";
    for (const text of textList) {
      str += text.singleText;
    }
    if (str === "さくらんぼ") {
      alert("正解");
    }
  }, [textList]);

  return (
    <NoSSR>
      <Layout title="Home">
        <div className="flex justify-center items-center flex-col min-h-screen">
          {/* {data && data.words.map((word) => <p key={word.id}>{word.text}</p>)} */}
          <br />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppableId">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {textList.map((text, index) => (
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
