// TodoList.tsx
import React, { useEffect, useState, useRef } from "react";
import * as S from "./TodoList_Style";

interface Todo {
  title: string;
  filter: "All" | "Done" | "Undo";
  isCompleted: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(storeTodo);
  const [todoTitle, setTodotitle] = useState<string>("");
  const [filter, setFilter] = useState<string>("All")

  const dragItem = useRef<number>();
  const dragOverItem = useRef<number>();
  
  function handleAddTodo() {
    if (todoTitle.trim().length > 0) {
      const newTodo: Todo = {
        title: todoTitle,
        filter: "Undo",
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
      setTodotitle("");
    } else {
      alert("올바르지 않은 입력입니다.");
    }
  }

  function handleDeleteTodo(index: number) {
    const newTodos: Todo[] = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
  }

  function handleCompletedTodo(index: number) {
    const updateTodos = [...todos];
    updateTodos[index].isCompleted = !updateTodos[index].isCompleted;
    setTodos(updateTodos);
  }

  function handlefilterTodo() {
    
  }




  function storeTodo() {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  }

  function dragStart(e: React.DragEvent, index: number) {
    dragItem.current = index;
  }

  function dragOver(e: React.DragEvent, index: number) {
    dragOverItem.current = index;
  }

  function drop(e: React.DragEvent) {
    e.preventDefault();

    // typeScript
    if (dragItem.current == undefined || dragOverItem.current == undefined)
      return;

    // 옮기고 싶은 todo
    const moveTodo = todos[dragItem.current];

    const newTodo = [...todos];
    newTodo.splice(dragItem.current, 1);
    newTodo.splice(dragOverItem.current, 0, moveTodo);

    setTodos(newTodo);

    dragItem.current = undefined;
    dragOverItem.current = undefined;
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <S.Container>
      <S.Title>할 일 관리</S.Title>
      <S.InputContainer>
        <S.Input
          type="text"
          placeholder="할 일을 입력하세요"
          value={todoTitle}
          onChange={(e) => {
            setTodotitle(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleAddTodo();
            }
          }}
        />
        <S.Button onClick={handleAddTodo}>추가</S.Button>
      </S.InputContainer>

      <S.TodoList>
        {todos.length > 0 ? (
          todos.map((todo, index) => {
            return (
              <S.TodoItem
                key={index}
                draggable
                onDragStart={(e) => {
                  dragStart(e, index);
                }}
                onDragOverCapture={(e) => {
                  dragOver(e, index);
                }}
                onDragEnd={(e) => {
                  drop(e);
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <S.Checkbox
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => {
                    handleCompletedTodo(index);
                  }}
                />
                <S.TodoText $completed={todo.isCompleted ? true : false}>
                  {todo.title}
                </S.TodoText>
                <S.Button
                  $variant="delete"
                  onClick={() => {
                    handleDeleteTodo(index);
                  }}
                >
                  삭제
                </S.Button>
              </S.TodoItem>
            );
          })
        ) : (
          <div>할일을 만들어 주세요!</div>
        )}
      </S.TodoList>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </S.Container>
  );
}
