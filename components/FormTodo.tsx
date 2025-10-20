import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useTodos } from "../app/hooks/useTodo";
import { globalStyles } from "../styles/globalStyles";

interface FormTodoProps {
  id?: number;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  resetId: (id: number) => void;
}
const FormTodo: React.FC<FormTodoProps> = ({
  id,
  isVisible,
  setIsVisible,
  resetId,
}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { detailTodo, loading, fetchDetailTodo, addTodo, editTodo } =
    useTodos();

  const addTask = async () => {
    if (!title || !content) return;
    await addTodo(title, content);
    setTitle("");
    setContent("");
    setIsVisible(false);
  };
  const editTask = async () => {
    if (!title || !content) return;
    if (id) {
      await editTodo(id, title, content, "Done");
    }
    setTitle("");
    setContent("");
    resetId(0);
    setIsVisible(false);
  };
  useEffect(() => {
    if (id) {
      fetchDetailTodo(id);
    }
  }, [id]);
  useEffect(() => {
    if (detailTodo) {
      setTitle(detailTodo.title);
      setContent(detailTodo.content);
    }
  }, [detailTodo]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      style={{ margin: 0 }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={globalStyles.modalContent}>
        <Text style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}>
          {id ? "Edit" : "Add New"} Task
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
        <TouchableOpacity
          style={globalStyles.button}
          onPress={id ? editTask : addTask}
        >
          <Text style={globalStyles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default FormTodo;
