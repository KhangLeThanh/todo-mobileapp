import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import TodoItem from "../components/TodoItem";
import { globalStyles } from "../styles/globalStyles";
import { createTodo, getTodos } from "./api/todo";
import { Todo } from "./types";

const HomeScreen: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [todo, setTodo] = useState<Todo[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
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
    setModalVisible(false);
    fetchTodos();
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity
        style={[globalStyles.button, { marginBottom: 10 }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={globalStyles.buttonText}>Add a task</Text>
      </TouchableOpacity>
      {/* Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={{ margin: 0 }} // full screen, no margin
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={globalStyles.modalContent}>
          <Text style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}>
            Add New Task
          </Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Content"
            value={content}
            onChangeText={setContent}
          />
          <TouchableOpacity style={globalStyles.button} onPress={addTask}>
            <Text style={globalStyles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* Task List */}
      <FlatList
        data={todo}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TodoItem item={item} />}
      />
    </View>
  );
};

export default HomeScreen;
