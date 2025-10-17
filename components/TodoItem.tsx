// components/TodoItem.tsx
import React from "react";
import { Text, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";

interface TodoItemProps {
  item: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  return (
    <View style={globalStyles.itemContainer}>
      <Text style={globalStyles.itemText}>{item}</Text>
    </View>
  );
};

export default TodoItem;
