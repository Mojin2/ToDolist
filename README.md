# TypeScript 이용한 ToDo application

Typescript + react-hook-form + recoil 연습
<br><br>

## 🖥️ 프로젝트 소개

- 커스텀 카테고리를 제공하는 todo앱

### ⏱️ 프로젝트 기간

- 2023.5.15~

### ⚙️ 프로젝트 환경

- **react** 18.2.0
- **react-hook-from** : 7.34.9
- **typescript** : 4.9.5
- **recoil** : 0.7.7
- **recoil-persist** : 4.2.0

### 🗓️ 프로젝트 진행

- atom을 통한 todoList 관리 ✅
- custom 카테고리 추가 기능 ✅
- custome 카테고리 조건부 입력
- local storage를 이용한 persistence ✅
- styled components이용 css구성 50% ✅
- animation 적용
  <br><br><br>

# Other tips

## ❗️ React 프로젝트 생성 with TypeScript

    npx create-react-app app --template typescript
    npm i styled-components
    npm i --save-dev @types/styled-components
    npm i recoil

## ❗️ React Hook Form

```
npm i react-hook-form
```

**Code Example**

```
const { register, handleSubmit, setValue } = useForm<IToDoData>();
```

```
const onValid = (data: IToDoData) => {};
return (
    <form onSubmit={handleSubmit(onValid)}>
        <input
            {...register("toDo", {
            required: { value: true, message: "Message" },
            })}
            placeholder="Write a to do"
        />
        <button>Add</button>
    </form>
);
```

## ❗️ Recoil

- `<App>`을 `<RecoilRoot>` 내부에 위치
- **atoms.tsx** 파일 생성 후 atom 생성 후 사용

```
export const categoryState = atom({
  key: "KEY_NAME",
  default: "Default_value",
});
```

```
const [value,modFn] = useRecoilState(atom) // 값과 함수
const modFn = useSetRecoilState(atom) // 함수
const value = useRecoilValue(atom) // 값
```

- selector : atom에서 데이터를 변형시켜서 받을때 이용

```
export const toDoSelector = selector({
  key: "selector",
  get: ({ get }) => {
    const toDos = get(toDoState); //get함수를 통해 atom을 가져옴
    const category = get(categoryState);
    return toDos.filter((value) => value.category === category);
  },
});
```
