"use client";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../api/apiSlice";
import TodoList from "@/components/TodoList";
export default function Home() {
  return (
    <ApiProvider api={apiSlice}>
      <TodoList />
    </ApiProvider>
  );
}
