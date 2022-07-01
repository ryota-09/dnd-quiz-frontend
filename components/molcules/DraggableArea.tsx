import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { DraggableText } from "../../pages";

type Props = {
  index: number;
  text: DraggableText;
};

const DoraggableArea: FC<Props> = ({ index, text }) => {
  return (
    <>
      <Draggable index={index} draggableId={text.draggableId}>
        {(provided) => (
          <div
            key={text.id}
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
