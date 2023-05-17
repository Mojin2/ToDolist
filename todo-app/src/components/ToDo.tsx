import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryKind, IToDo, toDoState } from "../atoms";

const ChangeButton = styled.button`
  background-color: #3a76c2;
  color: whitesmoke;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #f787a0;
  }
  margin-left: 5px;
  cursor: pointer;
`;
const DeleteButton = styled.button`
  border: none;
  background-color: whitesmoke;
  margin-bottom: 10px;
  cursor: pointer;
`;
const Text = styled.span`
  color: black;
  margin-right: 20px;
  font-size: 20px;
  font-weight: 500;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border: none;
  margin: 5px auto;
  justify-content: space-between;
  text-align: center;
  background-color: whitesmoke;
  border-radius: 3px;
  font-family: "Source Sans Pro", sans-serif;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const TextWrapper = styled.div`
  padding-top: 12.5px;
`;
const ChangeButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const DeleteButtonWrapper = styled.div`
  text-align: right;
`;
function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const catArr = useRecoilValue(categoryKind);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((cur) => {
      const targetIndex = cur.findIndex((toDo) => toDo.id === id);
      const oldToDo = cur[targetIndex];
      const newToDo = { text, category: name as any, id };
      // category는 TO_DO,DOING,DONE 타입인데 name이라는 string으로 정의되어 오류 발생 >> as any
      cur = [
        ...cur.slice(0, targetIndex),
        newToDo,
        ...cur.slice(targetIndex + 1),
      ];
      return cur;
    });
  };
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((cur) => {
      const targetIndex = cur.findIndex((toDo) => toDo.id === id);
      cur = [...cur.slice(0, targetIndex), ...cur.slice(targetIndex + 1)];
      return cur;
    });
  };

  return (
    <Wrapper>
      <TextWrapper>
        <Text>✅ {text}</Text>
      </TextWrapper>
      <ButtonWrapper>
        <DeleteButtonWrapper>
          <DeleteButton onClick={handleDelete}>❌</DeleteButton>
        </DeleteButtonWrapper>
        <ChangeButtonWrapper>
          {catArr
            .filter((value: any) => value !== category)
            .map((cat: any) => (
              <ChangeButton key={`${cat}`} name={`${cat}`} onClick={onClick}>
                {cat}
              </ChangeButton>
            ))}
        </ChangeButtonWrapper>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default ToDo;
