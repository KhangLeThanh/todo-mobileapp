// components/TodoItem.tsx
import { Todo } from "@/app/types";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTodos } from "../app/hooks/useTodo";
import { globalStyles } from "../styles/globalStyles";

interface TodoItemProps {
  item: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  const [isModalVisible, setModalVisible] = useState(false);
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
        <TouchableOpacity style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => deleteTask(item.id)}
        >
          <Text style={globalStyles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoItem;
