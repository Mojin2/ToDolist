import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryKind, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

interface ICreateCategory {
  newCat: string;
}
function ToDoList() {
  // const toDos = useRecoilValue(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const [catArr, setCatArr] = useRecoilState(categoryKind);
  const { register, handleSubmit, setValue } = useForm<ICreateCategory>();
  const onValid = (data: ICreateCategory) => {
    setCatArr((cur) => [...cur, data.newCat]);
    setValue("newCat", "");
  };
  return (
    <div>
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("newCat")} placeholder="Create new Category" />
        <button>Create</button>
      </form>
      <select value={category} onInput={onInput}>
        {catArr.map((cat) => (
          <option key={cat} value={`${cat}`}>
            {cat}
          </option>
        ))}
        {/* <option value={"TO_DO"}>TO DO</option>
        <option value={"DOING"}>Doing</option>
        <option value={"DONE"}>Done</option> */}
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
      {/* <h2>To Do</h2>
      <ul>
        {toDo.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <h2>Doing</h2>
      <ul>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <h2>Done</h2>
      <ul>
        {done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul> */}
    </div>
  );
}
// interface IFormData {
//   id: string;
//   password?: string; //required가 아닐경우 ?를 붙여줌
//   password1: string;
//   errors: {
//     // formState의 errors에서 message를 관리하기 위해 타입 정의
//     id: { message: string };
//   };
//   extraError?: string;
// }
// function ToDoList() {
//   const {
//     register, // input form register
//     watch, // data check
//     handleSubmit, // Submit action control
//     formState: { errors }, // validation check
//     setError, // custom validation
//   } = useForm<IFormData>();
//   const onValid = (data: IFormData) => {
//     if (data.password !== data.password1) {
//       setError(
//         "password1",
//         { message: "Password are not the same" },
//         { shouldFocus: true }
//       );
//     }
//     //setError("extraError", { message: "Server offline" }); // Extra Error
//   };
//   console.log(errors);
//   return (
//     <div>
//       <form
//         style={{ display: "flex", flexDirection: "column" }}
//         onSubmit={handleSubmit(onValid)}
//       >
//         <input
//           {...register("id", {
//             required: { value: true, message: "ID is required." },
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//               message: "Only naver.com emails allowed.",
//             },
//             validate: {
//               noMo: (value) => (value.includes("Mo") ? "No Mo allowed" : true),
//             },
//           })}
//           placeholder="Write a to do"
//         />
//         <span>{errors?.id?.message}</span>
//         <input {...register("password")} placeholder="password" />
//         <input {...register("password1")} placeholder="password confirm" />
//         <span>{errors?.password1?.message}</span>
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

export default ToDoList;
