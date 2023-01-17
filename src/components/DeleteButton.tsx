import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodoState, todoState } from "../atoms";

const DeleteBoard = styled.button`
  position: absolute;
  right: 3px;
  top: 5px;
  background: transparent;
  border: none;
`;

interface IDeleteButtonProps {
  boardId: string;
  todos: ITodoState;
}

function DeleteButton({ boardId, todos }: IDeleteButtonProps) {
  const setTodos = useSetRecoilState(todoState);
  const onClick = () => {
    setTodos((prev) => {
      let temp = { ...prev };
      delete temp[boardId];
      return temp;
    });
    localStorage.removeItem(boardId);

    console.log(todos);
  };
  return <DeleteBoard onClick={onClick}>❌</DeleteBoard>;
}
export default React.memo(DeleteButton);
