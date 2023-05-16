import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

type Category = "TODO" | "DOING" | "DONE";

export const toDoState = atom<IToDo[]>({
  key: "toDos",
  default: [],
});

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const categoryKind = atom({
  key: "categoryKind",
  default: ["TO_DO", "DOING", "DONE"],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState); //selector가 atom을 보는중
    const category = get(categoryState);
    return toDos.filter((value) => value.category === category);
  },
});