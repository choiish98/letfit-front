import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  list_top: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  list_top_rank: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    marginLeft: 5,
    backgroundColor: "#242A3D",
  },
  list_top_rank_text: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "600",
    color: "white",
    marginBottom: -2,
  },
  list_top_rank_underLine: {
    width: "28%",
    height: 1,
    backgroundColor: "white",
  },
  list_top_rank_info: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 20,
  },
  list_top_rank_info_name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#242A3D",
  },
  list_top_rank_info_follow: {
    fontSize: 11,
    color: "#464B58",
  },
  list_bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  list_hashtags: {
    color: "#242A3D",
  },
  list_bottom_creator: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  list_bottom_creator_username: {
    fontSize: 14,
    fontWeight: "600",
    color: "#464B58",
  },
  list_bottom_creator_img: {
    width: 25,
    height: 25,
    marginLeft: 10,
    marginBottom: 3,
  },
});
