import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) => (props.isDragging ? "#74b9ff" : "whitesmoke")};
  margin-bottom: 5px;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"};
`;
interface IDragabbleCardProps {
  toDo: string;
  idx: number;
}
function DragabbleCard({ toDo, idx }: IDragabbleCardProps) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={idx}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
          ref={magic.innerRef}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
