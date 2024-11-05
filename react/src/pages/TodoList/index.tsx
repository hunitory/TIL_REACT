import React, { useState } from 'react';
import { todo } from './data';
import { TodoList } from 'components';
import TodoListInput from 'components/todolist/todoinput';

export interface Todo {
  content: string;
  completed: boolean;
  isEdited: boolean;
}

export default function TodoListPage() {
  const [todoList, setTodoList] = useState<Todo[]>(todo);
  const [editInput, setEditInput] = useState<string>('');
  const [todoContent, setTodoContent] = useState<string>('');

  function handleAddTodo() {
    const newTodos: Todo = {
      content: todoContent,
      completed: false,
      isEdited: false,
    };
    setTodoList([...todoList, newTodos]);
    setTodoContent('');
  }

  function handleDeleteTodo(index: number) {
    const updateTodo = todoList.filter((todo, i) => i !== index);
    setTodoList(updateTodo);
  }

  const handleCompleteTodo = (index: number) => {
    setTodoList((prevList) => {
      const updateTodoList = [...prevList];
      updateTodoList[index].completed = !updateTodoList[index].completed;
      return updateTodoList;
    });
  };

  const handleEditTodo = (index: number) => {
    setTodoList((prevList) => {
      const updatedTodoList = [...prevList];
      if (updatedTodoList[index].isEdited) {
        updatedTodoList[index].content = editInput;
      } else {
        setEditInput(updatedTodoList[index].content);
      }
      updatedTodoList[index].isEdited = !updatedTodoList[index].isEdited;
      return updatedTodoList;
    });
  };

  return (
    <>
      <main>todolist</main>
      <TodoList
        todos={todoList}
        DeleteTodo={handleDeleteTodo}
        EditTodo={handleEditTodo}
        setEditInput={setEditInput}
        CompletedTodo={handleCompleteTodo}
      />
      <TodoListInput
        todoContent={todoContent}
        setTodoContent={setTodoContent}
        handleAddTodo={handleAddTodo}
      />
      {todoList.map((todo) => {
        return <div>{todo.content}</div>;
      })}
    </>
  );
}
