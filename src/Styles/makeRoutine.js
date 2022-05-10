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
  titleBox: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  titleBox_text: {
    fontSize: 25,
  },
  hashtagBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#242A3D",
  },
  hashtagBox_img: {
    width: 10,
    height: 10,
  },
  calander: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#464B58",
  },
  calader_day: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: 50,
    height: 100,
    padding: 3,
    paddingBottom: 10,
  },
  calader_day_bar: {
    justifyContent: "center",
    width: 30,
    backgroundColor: "#DEDEDE",
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  calader_day_Text: {
    color: "#2A3042",
    fontWeight: "600",
  },
  calader_day_reText: {
    color: "#DEDEDE",
    fontWeight: "600",
  },
  exercise_plus: {
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    backgroundColor: "#DEDEDE",
  },
});
