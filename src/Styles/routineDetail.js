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
  creator_box: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  profile: {
    justifyContent: "center",
    alignItems: "center",
  },
  profile_img: {
    resizeMode: "contain",
    maxWidth: 20,
  },
  username: {
    marginLeft: 10,
    textAlign: "center",
    fontSize: 18,
    color: "#7F7F80",
  },
  routineName: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "600",
    color: "#242A3D",
    marginBottom: 15,
  },
  hashtags_box: {
    flexDirection: "row",
    paddingBottom: 4,
    marginBottom: 5,
    borderBottomWidth: 1.2,
    borderBottomColor: "#242A3D",
  },
  hashtags_border: {
    borderBottomWidth: 1,
    borderBottomColor: "#242A3D",
    paddingBottom: 0,
    marginRight: 5,
  },
  hashtags: {
    fontSize: 12,
    color: "#242A3D",
  },
  toolBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 20,
    backgroundColor: "#2A3042",
  },
  btn_text: {
    fontSize: 12,
    color: "white",
  },
  follower: {
    textAlign: "center",
    fontSize: 12,
    color: "#7F7F80",
  },
  calander: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
  },
});
