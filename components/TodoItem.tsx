// components/TodoItem.tsx
import { Todo } from "@/app/types";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTodos } from "../app/hooks/useTodo";
import { globalStyles } from "../styles/globalStyles";
import FormTodo from "./FormTodo";

interface TodoItemProps {
  item: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [idTodo, setIdTodo] = useState<number>(0);

  const { removeTodo } = useTodos();

  const deleteTask = async (todoId: number) => {
    await removeTodo(todoId);
    setModalVisible(false);
  };

  return (
    <View style={globalStyles.itemContainer}>
      <View style={{ justifyContent: "flex-start" }}>
        <Text style={globalStyles.itemText}>{item.title}</Text>
        <Text style={globalStyles.itemText}>{item.status}</Text>
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => {
            setModalVisible(true);
            setIdTodo(item.id);
          }}
        >
          <Text style={globalStyles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => deleteTask(item.id)}
        >
          <Text style={globalStyles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <FormTodo
        isVisible={isModalVisible}
        setIsVisible={setModalVisible}
        id={idTodo}
        resetId={setIdTodo}
      />
    </View>
  );
};

export default TodoItem;
