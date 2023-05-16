import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryKind, IToDo, toDoState } from "../atoms";

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
    <li>
      <span>{text}</span>
      {catArr
        .filter((value) => value !== category)
        .map((cat) => (
          <button name={`${cat}`} onClick={onClick}>
            {cat}
          </button>
        ))}
      <button onClick={handleDelete}>❌</button>
    </li>
  );
}

export default ToDo;
