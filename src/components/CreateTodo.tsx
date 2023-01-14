import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { Categories, categoryState, ITodos, todosState } from "../atoms";

interface IForm {
  todo: string;
}
function CreateTodo() {
  const [todos, setTodos] = useRecoilState<ITodos[]>(todosState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    setValue("todo", "");
    setTodos((prev) => [
      {
        text: data.todo,
        id: Date.now(),
        category: category,
      },
      ...prev,
    ]);
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input {...register("todo")} placeholder="Write your todo" />
      <button>Add</button>
    </form>
  );
}
export default CreateTodo;
