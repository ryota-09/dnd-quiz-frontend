/* eslint-disable react/display-name */
import { FC, memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { DraggableText } from "../../types/types";

type Props = {
  index: number;
  text: DraggableText;
};

const DoraggableArea: FC<Props> = memo(({ index, text }) => {
  return (
    <>
      <Draggable index={index} draggableId={text.id}>
        {(provided, snapshot) => (
          <div
            key={text.id}
            className="border bg-green-300 px-10 py-10 text-7xl rounded-md"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              // ドラッグ中のCSSの変更はここ。
              opacity: snapshot.isDragging ? "0.7" : "1",
            }}
          >
            <p>{text.singleText}</p>
          </div>
        )}
      </Draggable>
    </>
  );
});
export default DoraggableArea;
