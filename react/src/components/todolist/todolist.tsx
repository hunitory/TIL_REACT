import React from 'react';
import { Todo } from 'pages/TodoList';
import TodoListButton from './todolistbutton';

interface TodoListProps {
  todos: Todo[];
  CompletedTodo: (index: number) => void;
  EditTodo: (index: number) => void;
  setEditInput: (value: string) => void;
  DeleteTodo: (index: number) => void;
}

export default function TodoList({
  todos,
  CompletedTodo,
  EditTodo,
  setEditInput,
  DeleteTodo,
}: TodoListProps) {
  return (
    <>
      {todos.map((todo, index) => {
        if (todo.isEdited) {
          return (
            <>
              <input
                type="text"
                value={todo.content}
                onChange={(e) => setEditInput(e.target.value)}
              />
              <TodoListButton content="수정완료" onClick={() => EditTodo(index)} />
            </>
          );
        } else {
          return (
            <ul key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              <li>
                <span>#{index + 1} </span>
                <span>{todo.content} </span>
                <TodoListButton content="완료" onClick={() => CompletedTodo(index)} />
                <TodoListButton content="수정" onClick={() => EditTodo(index)} />
                <TodoListButton content="삭제" onClick={() => DeleteTodo(index)} />
              </li>
            </ul>
          );
        }
      })}
    </>
  );
}
