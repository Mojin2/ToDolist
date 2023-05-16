import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IToDoData {
  toDo: string;
}

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
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", {
          required: { value: true, message: "Please Write a To Do." },
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
