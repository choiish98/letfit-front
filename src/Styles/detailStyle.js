import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A3042",
  },
  body: {
    flex: 7.5,
    alignItems: "center",
  },
  photo: {
    width: "90%",
    height: 300,
    marginTop: 70,
    marginBottom: 20,
    backgroundColor: "white",
  },
  photo2: {
    position: "absolute",
    top: -15,
    width: "85%",
    backgroundColor: "#DEDEDE",
  },
  photo3: {
    position: "absolute",
    top: -30,
    width: "80%",
    backgroundColor: "#7F7F80",
  },
  photo4: {
    position: "absolute",
    top: -45,
    width: "75%",
    backgroundColor: "#313232",
  },
  content: {
    width: "90%",
  },
  postInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  posterInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  content_text: {
    marginLeft: 5,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  subText: {
    fontSize: 12,
    color: "white",
  },
  btn: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  btn_box: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#DEDEDE",
  },
  btn_text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2A3042",
  },
});
