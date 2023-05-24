import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const toDoState = atom<IToDo[]>({
  key: "toDos",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const categoryKind = atom({
  key: "categoryKind",
  default: ["TO_DO", "DOING", "DONE"],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState); //selector가 atom을 보는중
    const category = get(categoryState);
    return toDos.filter((value) => value.category === category);
  },
});

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});
interface IToDoState {
  [key: string]: string[];
}
export const toDoState2 = atom<IToDoState>({
  key: "toDo",
  default: { "To Do": ["a", "b"], doing: ["c", "d", "e"], done: ["f"] },
});
