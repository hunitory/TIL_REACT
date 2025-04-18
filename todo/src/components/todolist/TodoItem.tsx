import { Todo, useTodoStore } from "../../stores/todoList/todoStore";
import * as S from "./TodoList_Style";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const dragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("index", index.toString());
  };

  const dragEnter = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("index", index.toString());
  };

  const drop = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <S.TodoItem
      key={todo.id}
      draggable
      onDragStart={(e) => {
        dragStart(e, todo.id);
      }}
      onDragEnter={(e) => {
        dragEnter(e, todo.id);
      }}
      onDragEnd={(e) => {
        drop(e);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <>{typeof todo.isCompleted}</>
      <S.Checkbox
        type="checkbox"
        defaultChecked={todo.isCompleted}
        onChange={() => {}}
      />
      <S.TodoText $completed={todo.isCompleted ? true : false}>
        {todo.title}
      </S.TodoText>

      {/* todo delete button */}
      <S.Button
        $variant="delete"
        onClick={() => useTodoStore.getState().deleteTodo(todo.id)}
      >
        삭제
      </S.Button>
    </S.TodoItem>
  );
}
