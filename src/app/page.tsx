"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  const addTodo = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title: newTodo }),
      headers: { "Content-Type": "application/json" },
    });
    const todo = await res.json();
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Todo App</h1>
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </main>
  );
}
