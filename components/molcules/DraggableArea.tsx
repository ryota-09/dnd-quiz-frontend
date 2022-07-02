import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { DraggableText } from "../../types/types";

type Props = {
  index: number;
  text: DraggableText;
};

const DoraggableArea: FC<Props> = ({ index, text }) => {
  return (
    <>
      <Draggable index={index} draggableId={text.id}>
        {(provided) => (
          <div
            key={text.id}
            className="border border-green-500 px-10 py-10 text-5xl"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <p>{text.singleText}</p>
          </div>
        )}
      </Draggable>
    </>
  );
};
export default DoraggableArea;
