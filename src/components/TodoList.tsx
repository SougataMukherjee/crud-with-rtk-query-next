import React, { useState, useMemo } from "react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../api/apiSlice";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const { data: todos, isLoading, isSuccess, isError } = useGetTodosQuery({});

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo({
      userId: 1,
      title: newTodo,
      completed: false,
    });
    setNewTodo("");
  };

  const todoItems = useMemo(() => {
    return todos?.map((todo) => (
      <article key={todo.id}>
        <div className="todo">
          <input
            type="checkbox"
            checked={todo.completed}
            id={`${todo.id}`}
            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
          />
          <label htmlFor={`${todo.id}`}>{todo.title}</label>
        </div>
        <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
          Delete
        </button>
      </article>
    ));
  }, [todos, updateTodo, deleteTodo]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todoItems;
  } else if (isError) {
    const errorMessage = "Unknown error";
    content = <p>{errorMessage}</p>;
  }

  return (
    <main>
      <h1>Todo list</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">Enter a todo item</label>
        <div className="new-todo">
          <input
            type="text"
            id="new-todo"
            value={newTodo}
            className="border-2"
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new todo"
          />
        </div>
        <button className="submit">Add +</button>
      </form>
      {content}
    </main>
  );
};

export default TodoList;
