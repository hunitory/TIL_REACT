import React, { useState } from 'react';
import { todo } from './data';
import { TodoList } from 'components';
import TodoListInput from 'components/todolist/todoinput';

export interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>(todo);
  const [todoContent, setTodoContent] = useState<string>('');

  function handleAddTodo() {
    const newTodos: Todo = {
      id: todos.length + 1,
      content: todoContent,
      completed: false,
    };
    setTodos([...todos, newTodos]);
    setTodoContent('');
  }

  function handleDeleteTodo(index: number) {
    const updateTodo = todos.filter((todo, i) => i !== index);
    setTodos(updateTodo);
  }

  const handleCompleteTodo = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(updatedTodos);
  };

  return (
    <>
      <main>todolist</main>
      <TodoList todos={todos} DeleteTodo={handleDeleteTodo} CompletedTodo={handleCompleteTodo} />
      <TodoListInput
        todoContent={todoContent}
        setTodoContent={setTodoContent}
        handleAddTodo={handleAddTodo}
      />
    </>
  );
}
