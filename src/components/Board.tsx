import { Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, ITodoState, todoState } from "../atoms";
import DraggableCards from "./DraggableCards";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import DeleteButton from "./DeleteButton";
const Container = styled.div`
  background-color: #ffb275;
  min-height: 200px;
  min-width: 200px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const BoardTitle = styled.h1`
  font-size: 40px;
  text-transform: uppercase;
  text-align: center;
  padding: 5px 0;
`;

const Area = styled.ul`
  flex-grow: 1;
  background-color: #ffb275;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3px 0;
`;
const NewTaskForm = styled.form`
  display: flex;
  input {
    width: 90%;
    border-radius: 10px;
  }
  button {
    border-radius: 10px;
  }
`;

interface IBoardProps {
  boardId: string;
  todos: ITodoState;
}

interface IForm {
  newTask: string;
}

function Board({ boardId, todos }: IBoardProps) {
  const setTodos = useSetRecoilState<ITodoState>(todoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ newTask }: IForm) => {
    setValue("newTask", "");
    setTodos((prev) => {
      const temp = [{ id: Date.now(), text: newTask }, ...prev[boardId]];
      return {
        ...prev,
        [boardId]: temp,
      };
    });
  };

  return (
    <Container>
      <BoardTitle>{boardId}</BoardTitle>
      <DeleteButton boardId={boardId} todos={todos} />
      <NewTaskForm onSubmit={handleSubmit(onValid)}>
        <input
          {...register("newTask", { required: true })}
          placeholder="Add a card"
        />
        <button>Add</button>
      </NewTaskForm>
      <Droppable droppableId={boardId}>
        {(provided) => (
          <Area ref={provided.innerRef} {...provided.droppableProps}>
            {todos[boardId].map((todo, index) => (
              <DraggableCards key={todo.id} todo={todo} index={index} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Container>
  );
}

export default Board;
