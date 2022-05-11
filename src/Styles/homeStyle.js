import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  userInfo: {
    marginBottom: 20,
    backgroundColor: "#2A3042",
  },
  userInfo_days_upperText: {
    fontSize: 90,
    color: "#fff",
  },
  userInfo_days_underText: {
    fontSize: 20,
    color: "#fff",
  },
  userInfo_tier_goal: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tier_img_box: {
    width: 60,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo_tier_goal_staff: {
    resizeMode: "contain",
    maxWidth: 60,
  },
  userInfo_tier_goal_text: {
    marginTop: 10,
    fontSize: 15,
    color: "#fff",
  },
  icons: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  icons_center: {
    width: 110,
    height: 110,
    borderRadius: 100,
    backgroundColor: "white",
  },
  icons_center_image: {
    width: 80,
    height: 80,
  },
  icons_each: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: "white",
  },
  icons_each_image: {
    width: 40,
    height: 40,
  },
  alignCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  eachItemView: {
    marginTop: 20,
    backgroundColor: "white",
    width: "90%",
    marginLeft: "5%",
  },
});
