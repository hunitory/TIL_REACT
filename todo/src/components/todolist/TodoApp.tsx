// TodoList.tsx
import { useEffect } from "react";
import * as S from "./TodoList_Style";
import { useTodoStore } from "../../stores/todoList/todoStore";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

export const TodoApp = () => {
  const todos = useTodoStore((state) => state.todos);

  // todos 변경 시 localStorage에 저장
  useEffect(() => {
    const data = {
      todos,
      timestamp: Date.now(),
    };
    localStorage.setItem("todos", JSON.stringify(data));

  }, [todos]);

  return (
    <S.Container>
      <S.Title>할 일 관리</S.Title>
      <AddTodo />
      <TodoList />
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </S.Container>
  );
};
