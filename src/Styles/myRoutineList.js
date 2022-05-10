import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    flex: 7.5,
    width: "90%",
    marginLeft: "5%",
  },
  status: {
    alignItems: "center",
    padding: 10,
  },
  statusFont: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: "600",
    color: "#242A3D",
  },
  calander: {
    alignItems: "center",
    width: "90%",
    marginLeft: "5%",
  },
  progress: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  progress_status: {
    alignItems: "flex-end",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#2A3042",
  },
  progress_status_center_text: {
    fontSize: 10,
    color: "#DEDEDE",
  },
  progress_status_center_value: {
    fontSize: 15,
    color: "black",
    fontWeight: "600",
    marginTop: 3,
  },
  settingIcon: {
    width: 25,
    height: 25,
  },
  flexRow: {
    flexDirection: "row",
  },
  contentCenter: {
    justifyContent: "center",
  },
  contentSpaceBetween: {
    justifyContent: "space-between",
  },
});
