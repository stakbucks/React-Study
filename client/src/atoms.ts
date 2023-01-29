import { atom } from "recoil";

export interface ITodoListState {
  id: number;
  todo: string;
  done: boolean;
}

export const todoListState = atom<ITodoListState[]>({
  key: "todoList",
  default: [],
});
