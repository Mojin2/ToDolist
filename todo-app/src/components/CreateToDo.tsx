import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

interface IToDoData {
  toDo: string;
}
const CreateButton = styled.button`
  border: none;
  background-color: whitesmoke;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f787a0;
  }
`;

const CreateInput = styled.input`
  padding: 10px;
`;
const InputContainer = styled.div`
  text-align: center;
  margin-bottom: 18px;
`;

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IToDoData>();
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const onValid = (data: IToDoData) => {
    // console.log(`Input data : ${data.toDo}`);
    setToDos((cur) => [...cur, { text: data.toDo, category, id: Date.now() }]);
    setValue("toDo", "");
  };
  return (
    <InputContainer>
      <form onSubmit={handleSubmit(onValid)}>
        <CreateInput
          {...register("toDo", {
            required: { value: true, message: "Please Write a To Do." },
          })}
          placeholder="Write a to do"
        />
        <CreateButton>Add</CreateButton>
      </form>
    </InputContainer>
  );
}

export default CreateToDo;
