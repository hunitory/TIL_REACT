// TodoList.tsx
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

interface Todo {
  title: string;
  isCompleted: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(storeTodo);
  const [todoTitle, setTodotitle] = useState<string>("");

  const dragItem = useRef<Todo>();
  const dragOverItem = useRef<Todo>();

  function handleAddTodo() {
    if (todoTitle.trim().length > 0) {
      const newTodo: Todo = {
        title: todoTitle,
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

  function storeTodo() {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  }

  function dragStart(todo: Todo) {
    dragItem.current = todo
    console.log("item", dragItem.current);
  }

  function dragEnter(todo: Todo) {
    dragOverItem.current = todo;
    console.log("over", dragOverItem.current);
  }

  function drop(e: React.DragEvent) {
    e.preventDefault();
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Container>
      <Title>할 일 관리</Title>
      <InputContainer>
        <Input
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
        <Button onClick={handleAddTodo}>추가</Button>
      </InputContainer>

      <TodoList>
        {todos.length > 0 ? (
          todos.map((todo, index) => {
            return (
              <TodoItem
                key={index}
                draggable
                onDragStart={() => {
                  dragStart(todo);
                }}
                onDragEnter={() => {
                  dragEnter(todo);
                }}
                onDragEnd={() => {}}
                onDragOver={(e) => e.preventDefault()}
              >
                <Checkbox
                  type="checkbox"
                  defaultChecked={todo.isCompleted}
                  onChange={() => {
                    handleCompletedTodo(index);
                  }}
                />
                <TodoText $completed={todo.isCompleted ? "true" : "false"}>
                  {todo.title}
                </TodoText>
                <Button
                  $variant="delete"
                  onClick={() => {
                    handleDeleteTodo(index);
                  }}
                >
                  삭제
                </Button>
              </TodoItem>
            );
          })
        ) : (
          <div>할일을 만들어 주세요!</div>
        )}
      </TodoList>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #0066ff;
  }
`;

const Button = styled.button<{ $variant?: string }>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) =>
    props.$variant === "delete" ? "#ff4444" : "#0066ff"};
  color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${(props) =>
      props.$variant === "delete" ? "#cc0000" : "#0052cc"};
  }
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 8px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const TodoText = styled.span<{ $completed: string }>`
  flex: 1;
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
  color: ${(props) => (props.$completed ? "#888" : "#333")};
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;
