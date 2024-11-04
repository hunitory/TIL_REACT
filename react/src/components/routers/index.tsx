import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, TodoList } from 'pages';

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todolist" element={<TodoList />} />
      </Routes>
    </>
  );
}
