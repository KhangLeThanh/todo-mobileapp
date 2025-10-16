import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import TodoItem from "../components/TodoItem";
import { globalStyles } from "../styles/globalStyles";

const HomeScreen: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const deleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="Add a task..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={globalStyles.button} onPress={addTask}>
          <Text style={globalStyles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TodoItem item={item} onDelete={() => deleteTask(index)} />
        )}
      />
    </View>
  );
};

export default HomeScreen;
