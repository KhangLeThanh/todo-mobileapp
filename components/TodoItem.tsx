// components/TodoItem.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TodoItemProps {
  item: string;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onDelete }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.deleteText}>❌</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: { fontSize: 16 },
  deleteText: { fontSize: 18 },
});

export default TodoItem;
