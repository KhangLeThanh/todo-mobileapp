// components/TodoItem.tsx
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";

interface TodoItemProps {
  item: string;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onDelete }) => {
  return (
    <View style={globalStyles.itemContainer}>
      <Text style={globalStyles.itemText}>{item}</Text>
      <TouchableOpacity onPress={onDelete}>
        <Text style={globalStyles.deleteText}>❌</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoItem;
