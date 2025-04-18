import * as S from "./TodoList_Style";
import { useTodoStore } from "../../stores/todoList/todoStore";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos);

  return (
    <S.TodoList>
      {todos.length > 0 ? (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <div>할 일이 없습니다.</div>
      )}
    </S.TodoList>
  );
}
