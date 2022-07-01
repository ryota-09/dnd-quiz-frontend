import { useQuery } from "@apollo/client";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";
import { useState } from "react";
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

const dummyArray: DraggableText[] = [
  {
    id: uuid(),
    draggableId: uuid(),
    singleText: "さ",
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
];

const Home: React.FC = () => {
  const { data, error } = useQuery<GetWordListQuery>(GET_WORDLIST);
  const [textList, setTextList] = useState<DraggableText[]>(dummyArray);
  if (error) {
    console.log("エラー", error.message);
  }

  const handleDragEnd = (result: DropResult) => {
    //タスクを並び替える。
    //ドラッグしたものを削除している。
    const remove = textList.splice(result.source.index, 1);
    //ドロップ先に挿入している。
    textList.splice(result.destination.index, 0, remove[0]);
    // resetServerContext();
  };

  return (
    <Layout title="Home">
      <div className="flex justify-center items-center flex-col min-h-screen">
        <h1>ランキング</h1>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppableId">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {textList.map((text, index) => (
                  <div key={text.id}>
                    <DraggableArea key={text.id} index={index} text={text} />
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {/* 
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              // style={getListStyle(snapshot.isDraggingOver)}
            >
              {textList.map((text, index) => (
                <Draggable key={text.id} draggableId={text.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      // style={getItemStyle(
                      //   snapshot.isDragging,
                      //   provided.draggableProps.style
                      // )}
                    >
                      {text.singleText}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext> */}
      </div>
    </Layout>
  );
};
export default Home;
