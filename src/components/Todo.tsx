import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  Categories,
  categoryState,
  ITodos,
  todoSelector,
  todosState,
} from "../atoms";

function Todo() {
  const selectedTodos = useRecoilValue<ITodos[]>(todoSelector);
  const todos = useRecoilValue<ITodos[]>(todosState);
  const setTodos = useSetRecoilState<ITodos[]>(todosState);
  const [category, setCategory] = useRecoilState<Categories>(categoryState);
  const onClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number,
    text: string
  ) => {
    const {
      currentTarget: { name },
    } = event;
    const targetIndex = todos.findIndex((todo) => todo.id === id);
    setTodos((prev) => [
      ...prev.slice(0, targetIndex),
      {
        text,
        id,
        category: name as any,
      },
      ...prev.slice(targetIndex + 1),
    ]);
    console.log(event.currentTarget.parentElement);
  };
  return (
    <ul>
      {selectedTodos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          {todo.category !== Categories.TODO && (
            <button
              name={Categories.TODO}
              onClick={(event) => {
                onClick(event, todo.id, todo.text);
              }}
            >
              TODO
            </button>
          )}
          {todo.category !== Categories.DOING && (
            <button
              name={Categories.DOING}
              onClick={(event) => {
                onClick(event, todo.id, todo.text);
              }}
            >
              DOING
            </button>
          )}
          {todo.category !== Categories.DONE && (
            <button
              name={Categories.DONE}
              onClick={(event) => {
                onClick(event, todo.id, todo.text);
              }}
            >
              DONE
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
export default Todo;
