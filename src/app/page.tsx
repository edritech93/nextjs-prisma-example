"use client";

import { useEffect, useState } from "react";
import { Button, FloatingLabel } from "flowbite-react";

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
      <div className="flex mb-4 flex-row gap-4">
        <FloatingLabel
          variant={"outlined"}
          label="Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button onClick={addTodo}>Add</Button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </main>
  );
}
