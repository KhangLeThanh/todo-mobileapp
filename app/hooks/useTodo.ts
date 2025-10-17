import { useState } from "react";
import {
  createTodo,
  deleteTodo,
  getDetailsTodo,
  getTodos,
  updateTodo,
} from "../api/todo";
import { Todo } from "../types";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [detailTodo, setDetailTodo] = useState<Todo>();

  const [loading, setLoading] = useState(false);

  // Fetch all todos
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    } finally {
      setLoading(false);
    }
  };
  // Fetch detail todo
  const fetchDetailTodo = async (toDoId: number) => {
    setLoading(true);
    try {
      const data = await getDetailsTodo(toDoId);
      setDetailTodo(data);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    } finally {
      setLoading(false);
    }
  };
  // Add a new todo
  const addTodo = async (title: string, content: string) => {
    try {
      const newTodo = await createTodo(title, content, "Todo");
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  // Edit an existing todo
  const editTodo = async (
    todoId: number,
    title: string,
    content: string,
    status: string
  ) => {
    try {
      const updated = await updateTodo(title, content, status, todoId);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === updated.todoId ? updated : todo))
      );
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  // Remove a todo
  const removeTodo = async (todoId: number) => {
    try {
      await deleteTodo(todoId);
      setTodos((prev) =>
        prev.filter((todo) => todo.id.toString() !== todoId.toString())
      );
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  return {
    todos,
    loading,
    fetchTodos,
    addTodo,
    editTodo,
    removeTodo,
    fetchDetailTodo,
    detailTodo,
  };
};
