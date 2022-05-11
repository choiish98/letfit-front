import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topbar: {
    flex: 0.8,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#2A3042",
    paddingBottom: 15,
  },
  topbar_text: {
    width: "33%",
    textAlign: "center",
    fontSize: 25,
    color: "#2A3042",
    fontWeight: "600",
    color: "white",
  },
  body: {
    flex: 7,
    width: "90%",
    marginLeft: "5%",
  },
  title: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: "33%",
    marginTop: 20,
    marginLeft: "33%",
    marginBottom: "5%",
  },
  title_parts: {
    fontSize: 18,
    color: "#7F7F80",
  },
  title_exercise: {
    fontSize: 23,
    fontWeight: "600",
    color: "#242A3D",
  },
  body_topBox: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#464B58",
  },
  body_topBox_question: {
    justifyContent: "center",
    alignItems: "center",
    width: "33%",
    marginLeft: "33%",
  },
  body_topBox_question_imgBox: {
    width: 35,
    height: 35,
  },
  body_topBox_question_img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  body_topBox_question_text: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7F7F80",
  },
  body_timerBox: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 3,
    borderBottomColor: "#DEDEDF",
  },
  body_timerBox_topText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "#7F7F80",
  },
  body_timerBox_topTime: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "600",
    color: "#7F7F80",
  },
  body_count: {
    fontSize: 130,
    fontWeight: "600",
    fontStyle: "italic",
    color: "#D63417",
    marginBottom: -5,
  },
  body_restTime: {
    fontSize: 33,
    fontWeight: "600",
  },
  body_counterBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
  body_counterBox_num: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  body_counterBox_title: {
    fontSize: 25,
    fontWeight: "600",
    color: "#7F7F80",
  },
  body_counterBox_count: {
    fontSize: 28,
    fontWeight: "600",
    color: "#D63417",
  },
  body_counterBox_text: {
    marginLeft: 5,
    fontSize: 25,
    fontWeight: "600",
    color: "#000",
  },
});
