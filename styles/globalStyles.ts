import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Styles {
  container: ViewStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  itemContainer: ViewStyle;
  itemText: TextStyle;
  deleteText: TextStyle;
  modalContent: ViewStyle;
}

export const globalStyles = StyleSheet.create<Styles>({
  container: { flex: 1, backgroundColor: "#f0f0f0", padding: 20 },
  inputContainer: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: { color: "#fff", textAlign: "center" },
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
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
