import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { ITodoListState, todoListState } from "./atoms";
import { useRecoilState } from "recoil";
const SERVER_URL = "http://localhost:4000/api/todo";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form``;

const Btn = styled.button`
  border: none;
  background: transparent;
`;

function App() {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    axios.get(SERVER_URL).then((response) => setTodoList(response.data));
  }, []);
  console.log(todoList);
  const onValid = (data: any) => {
    setValue("newTodo", "");
    setValue("isDone", "");
    axios
      .post(SERVER_URL, {
        todo: data.newTodo,
        done: data.isDone,
      })
      .then(() => console.log("post success"));
  };
  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.name;
    axios.delete(`${SERVER_URL}/${id}`);
  };
  useEffect(() => {
    axios.get(SERVER_URL).then((response) => setTodoList(response.data));
  }, [handleDelete, onValid]);
  return (
    <Wrapper>
      <h1>Todo List</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("newTodo", { required: true })} type="text" />
        <input {...register("isDone")} type="checkbox" />
        <button type="submit">추가</button>
      </Form>
      <ul>
        {todoList.map((todo: ITodoListState) => (
          <li key={todo.id}>
            <span>{todo.todo} </span>
            <span>{todo.done ? "Y" : "N"}</span>
            <Btn name={todo.id + ""} onClick={handleDelete}>
              {" "}
              ❌{" "}
            </Btn>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}

export default App;
