import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { createTodo, getTodos } from "./api/todo";

const HomeScreen: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [todo, setTodo] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodo(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const addTask = async () => {
    if (!title || !content) return;
    await createTodo(title, content, "Todo");
    setTitle("");
    setContent("");
    fetchTodos();
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="Add a title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Add a content"
          value={content}
          onChangeText={setContent}
        />
        <TouchableOpacity style={globalStyles.button} onPress={addTask}>
          <Text style={globalStyles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
    </View>
  );
};

export default HomeScreen;
