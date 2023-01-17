import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Board from "./components/Board";
import { ITodo, ITodoState, todoState } from "./atoms";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  background-color: #ff93c7;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Boards = styled.div`
  margin-top: 50px;
  width: 80%;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
`;

const Trash = styled.img`
  height: 50px;
  width: 50px;
  position: fixed;
  top: 100px;
  right: 80px;
`;

const AddBoard = styled.form`
  display: flex;
  height: 10vh;
  justify-content: center;
  align-items: center;
  width: 50%;
  input {
    width: 80%;
    height: 50px;
    font-size: 50px;
    border-radius: 20px;
    text-align: center;
  }
`;

interface IBoardForm {
  newBoard: string;
}

function App() {
  let [todos, setTodos] = useRecoilState<ITodoState>(todoState);
  const { register, setValue, handleSubmit } = useForm<IBoardForm>();
  const onValid = ({ newBoard }: IBoardForm) => {
    setValue("newBoard", "");
    setTodos((prev) => {
      return {
        ...prev,
        [newBoard]: [],
      };
    });
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === "trash") {
      //버리는 경우(삭제)
      setTodos((prev) => {
        const temp = [...prev[source.droppableId]];
        temp.splice(source.index, 1);
        return {
          ...prev,
          [source.droppableId]: temp,
        };
      });
    } else if (source.droppableId === destination?.droppableId) {
      //같은 구역에 옮기는 경우
      setTodos((prev) => {
        const temp = [...prev[source.droppableId]];
        const target = temp[source.index];
        temp.splice(source.index, 1);
        temp.splice(destination.index, 0, target);
        return {
          ...prev,
          [source.droppableId]: temp,
        };
      });
    } else {
      //다른 구역에 옮기는 경우
      setTodos((prev) => {
        const sourceTemp = [...prev[source.droppableId]];
        const destinationTemp = [...prev[destination.droppableId]];
        const target = sourceTemp[source.index];
        sourceTemp.splice(source.index, 1);
        destinationTemp.splice(destination.index, 0, target);
        return {
          ...prev,
          [source.droppableId]: sourceTemp,
          [destination.droppableId]: destinationTemp,
        };
      });
    }
  };
  useEffect(() => {
    //페이지 첫 새로고침 시, 저장된 localStorage의 데이터를 todos에 옮기기
    for (let i = 0; i < localStorage.length; i++) {
      const board = localStorage.key(i) as string;
      const savedTodos = JSON.parse(localStorage.getItem(board as any) as any);
      setTodos((prev) => {
        return {
          ...prev,
          [board]: savedTodos,
        };
      });
    }
    console.log(localStorage.key(0));
  }, []);
  useEffect(() => {
    //todos에 저장된 데이터를 localStorage에 옮기기
    Object.keys(todos).forEach((boardId) => {
      localStorage.setItem(boardId, JSON.stringify(todos[boardId]));
    });
  }, [onDragEnd]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <AddBoard onSubmit={handleSubmit(onValid)}>
          <input
            {...register("newBoard", { required: true })}
            placeholder="Add another list"
          />
          <button>Add</button>
        </AddBoard>
        <Droppable droppableId="trash">
          {(provided) => (
            <Trash
              ref={provided.innerRef}
              {...provided.droppableProps}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZIwf6YcTP-XephZ81zc5IHoTlC3US5FURn_Yilk5a_UG0dZIvDP_a8KeQGT4x79KJGI0&usqp=CAU"
            />
          )}
        </Droppable>
        <Boards>
          {Object.keys(todos).map((boardId) => (
            <Board key={boardId} boardId={boardId} todos={todos} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
