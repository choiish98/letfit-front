import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topbar: {
    flex: 0.6,
    paddingTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2A3042",
  },
  topbar_text: {
    fontSize: 25,
    color: "#2A3042",
    fontWeight: "600",
    color: "white",
  },
  imagePicker: {
    flex: 2,
    alignItems: "center",
    backgroundColor: "#DEDEDE",
  },
  imagePicker_imgage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 150,
    height: 150,
    marginTop: 30,
  },
  description: {
    flex: 5,
  },
  description_text: {
    margin: 10,
    marginLeft: 20,
    marginTop: 20,
    fontSize: 20,
  },
});
