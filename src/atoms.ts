import { atom, selector, useRecoilValue } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface ITodoState {
  [key: string]: ITodo[];
}

export let todoState = atom<ITodoState>({
  key: "todos",
  default: {
    todo: [],
    doing: [],
    done: [],
  },
});
