import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodo } from "../atoms";

const Card = styled.div`
  background-color: #fbff99;
  width: 95%;
  height: 25px;
  border-radius: 10px;
  margin: 5px 0;
  padding: 3px;
  text-align: center;
`;

interface IDraggableCardsProps {
  todo: ITodo;
  index: number;
}

function DraggableCards({ todo, index }: IDraggableCardsProps) {
  return (
    <Draggable draggableId={todo.id + ""} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {todo.text}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCards);
