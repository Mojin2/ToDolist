import { useRecoilState } from "recoil";
import { hourSelector, minuteState, toDoState2 } from "../atoms";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import Board from "./Board";

// board color : #DADFE9
// card color : white

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function Recoilprc() {
  const [toDos, setToDos] = useRecoilState(toDoState2);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      setToDos((oldToDos) => {
        const todoCopy = [...oldToDos[source.droppableId]];
        todoCopy.splice(source.index, 1);
        todoCopy.splice(destination.index, 0, draggableId);
        return { ...oldToDos, [source.droppableId]: todoCopy };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((oldToDos) => {
        const sourceCopy = [...oldToDos[source.droppableId]];
        const desCopy = [...oldToDos[destination.droppableId]];
        sourceCopy.splice(source.index, 1);
        desCopy.splice(destination?.index, 0, draggableId);
        return {
          ...oldToDos,
          [source.droppableId]: sourceCopy,
          [destination.droppableId]: desCopy,
        };
      });
    }
    // setToDos((cur) => {
    //   const copy = [...cur];
    //   copy.splice(source.index, 1);
    //   copy.splice(destination?.index, 0, draggableId);
    //   return copy;
    // });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default Recoilprc;
