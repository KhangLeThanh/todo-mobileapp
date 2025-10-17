import axios from "axios";

const API_URL = "http://localhost:4000/api/todo";

export const getTodos = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createTodo = async (
  title: string,
  content: string,
  status: string
) => {
  const res = await axios.post(API_URL, { title, content, status });
  return res.data;
};
