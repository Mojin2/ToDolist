import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
  width: 300px;
  padding: 10px 0px;
  background-color: #dadfe9;
  padding-top: 10px;
  min-height: 300px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;
interface IBoardProps {
  toDos: string[];
  boardId: string;
}
const Title = styled.div`
  text-align: center;
  font-weight: 800;
  margin-bottom: 10px;
  font-size: 18px;
`;
interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
const Area = styled.div<IAreaProps>`
  flex-grow: 1;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            {...magic.droppableProps}
            ref={magic.innerRef}
          >
            {toDos.map((toDo, idx) => (
              <DragabbleCard key={toDo} idx={idx} toDo={toDo} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default Board;
