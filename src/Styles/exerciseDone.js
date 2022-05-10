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
  body_info: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#464B58",
  },
  body_info_today: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7F7F80",
    fontStyle: "italic",
    marginBottom: 15,
  },
  body_info_goalBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  body_info_goalBox_text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7F7F80",
    marginBottom: 3,
  },
  body_info_goalBox_timerSets: {
    fontSize: 48,
    fontWeight: "600",
    color: "#D63417",
  },
  body_info_goalBox_set: {
    fontSize: 48,
    fontWeight: "600",
  },
  body_info_goalBox_slash: {
    fontSize: 48,
    fontWeight: "600",
    marginLeft: 10,
    marginRight: 10,
  },
  body_setBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#DEDEDF",
  },
  body_setBox_small: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body_setBox_text: {
    fontSize: 28,
    fontWeight: "600",
    color: "#7F7F80",
  },
  body_setBox_data: {
    fontSize: 28,
    fontWeight: "600",
    color: "#D63417",
    marginLeft: 20,
    marginRight: 5,
  },
  body_report_text: {
    fontSize: 28,
    fontWeight: "600",
  },
  body_setBox_small_text: {
    fontSize: 15,
    fontWeight: "600",
    color: "#7F7F80",
  },
  body_setBox_imgBox: {
    width: 20,
    height: 25,
    marginLeft: 20,
    marginRight: 10,
  },
  body_setBox_img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  body_confirm: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  body_confirm_box: {
    width: 150,
    height: 150,
  },
});
