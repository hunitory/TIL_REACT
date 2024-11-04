import React from 'react';
import { Todo } from 'pages/TodoList';
import TodoListButton from './todolistbutton';

interface TodoListProps {
  todos: Todo[];
  CompletedTodo: (index: number) => void
  DeleteTodo: (index: number) => void
}

export default function TodoList({ todos, CompletedTodo, DeleteTodo }: TodoListProps) {
  return (
    <>
      {todos.map((todo, index) => {
        return (
          <ul key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <li>
              <span>#{index + 1} </span>
              <span>{todo.content} </span>
              <TodoListButton content="완료" onClick={() => CompletedTodo(index)} />
              <TodoListButton content="삭제" onClick={() => DeleteTodo(index)} />
            </li>
          </ul>
        );
      })}
    </>
  );
}
