import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryKind, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

interface ICreateCategory {
  newCat: string;
}
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  border: 2px solid white;
  border-radius: 10px;
  min-height: 600px;
  margin-top: 20px;
`;
const Title = styled.div`
  text-align: center;
  justify-content: center;
  margin: 20px;
  color: whitesmoke;
  font-size: 60px;
  font-weight: 900;
  padding: 20px 0px;
`;

const CategoryButton = styled.button`
  border: none;
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) => props.color};
  color: white;
  border-radius: 10px;
  &:hover {
    background-color: #f787a0;
  }
  width: 100px;
  margin-right: 3px;
`;
const CategoryContainer = styled.div`
  margin: 10px;
  text-align: center;
  justify-content: center;
`;

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
`;

function ToDoList() {
  // const toDos = useRecoilValue(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const [catArr, setCatArr] = useRecoilState(categoryKind);
  const { register, handleSubmit, setValue } = useForm<ICreateCategory>();
  const onValid = (data: ICreateCategory) => {
    setCatArr((cur: any) => [...cur, data.newCat]);
    setValue("newCat", "");
  };
  return (
    <Container>
      <Title>ToDoList</Title>
      <InputContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <CreateInput
            {...register("newCat")}
            placeholder="Create new Category"
          />
          <CreateButton>Create</CreateButton>
        </form>
      </InputContainer>
      <CategoryContainer>
        {catArr.map((cat: any) => {
          const bgColor = cat === category ? `#f787a0` : `#3a76c2`;
          return (
            <CategoryButton
              key={`${cat}`}
              color={bgColor}
              onClick={onClick}
              value={`${cat}`}
            >
              {cat}
            </CategoryButton>
          );
        })}
      </CategoryContainer>

      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container>
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
