import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  ITodos,
  todosState,
  todoSelector,
  categoryState,
} from "../atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

function TodoList() {
  const [category, setCategory] = useRecoilState(categoryState);


  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as any);
  };

  return (
    <>
      <h1>Todos</h1>
      <hr />
      <select onInput={onInput}>
        <option value={Categories.TODO}>Todo</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateTodo />
      <Todo />
    </>
  );
}
export default TodoList;
