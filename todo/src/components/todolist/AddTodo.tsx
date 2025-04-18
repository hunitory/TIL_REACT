import React, { useState } from "react";
import * as S from "./TodoList_Style";
import { useTodoStore } from "../../stores/todoList/todoStore";

export default function AddTodo() {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const todoStore = useTodoStore();
  return (
    <S.InputContainer>
      <S.Input
        type="text"
        placeholder="할 일을 입력하세요"
        value={todoTitle}
        onChange={(e) => {
          setTodoTitle(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            todoStore.addTodo(todoTitle);
          }
        }}
      />
      <S.Button onClick={() => todoStore.addTodo(todoTitle)}>추가</S.Button>
    </S.InputContainer>
  );
}
