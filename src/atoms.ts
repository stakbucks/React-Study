import { atom, selector } from "recoil";

export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface ITodos {
  text: string;
  id: number;
  category: Categories;
}

export const todosState = atom<ITodos[]>({
  key: "todos",
  default: [],
});
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TODO,
});
export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todosState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});
