import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 7.5,
  },
  userInfo: {
    flex: 1,
    backgroundColor: "#DEDEDE",
  },
  userInfo_upperInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  userInfo_upperInfo_each: {
    width: 100,
    height: 80,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  userInfo_upperInfo_days: {
    fontSize: 44,
    fontWeight: "600",
  },
  userInfo_underInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 50,
  },
  userInfo_underInfo_follow: {
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 28,
    backgroundColor: "#2A3042",
  },
  userInfo_underInfo_follow_text: {
    fontSize: 20,
    color: "white",
  },
  tier_img_box: {
    width: 60,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  tier_img: {
    resizeMode: "contain",
    width: 60,
    marginBottom: 15,
  },
  profile: {
    position: "absolute",
    bottom: "85%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#F9F5EE",
    width: 180,
    height: 180,
    borderRadius: 150,
  },
  profile_img: {
    width: 180,
    height: 180,
    borderRadius: 100,
  },
  feed: {
    flex: 3,
    backgroundColor: "#2A3042",
  },
  feed_profile_message: {
    paddingTop: 100,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  feed_profile_message_text: {
    fontSize: 18,
    color: "white",
  },
  feeds: {
    flexDirection: "row",
    justifyContent: "center",
    width: "30%",
    marginLeft: "2%",
    marginRight: "1%",
  },
  feed_uploadBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEDEDE",
    margin: 5,
    width: 120,
    height: 120,
  },
  feed_uploadBtn_text: {
    fontSize: 80,
    fontWeight: "600",
    color: "grey",
  },
  feeds_card: {
    margin: 5,
    width: 120,
    height: 120,
  },
});
