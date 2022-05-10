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
  body_topBox: {
    flex: 0.07,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  body_topBox_Text: {
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 4,
  },
  body_topBox_sort: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  body_topBox_sort_text: {
    fontSize: 16,
    marginRight: 5,
  },
  body_topBox_btn: {
    width: 8,
    height: 8,
  },
  body_toolBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 3,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  body_toolBox_left: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  body_toolBox_add: {
    width: 17,
    height: 17,
    marginRight: 5,
  },
  body_toolBox_search: {
    width: 23,
    height: 23,
  },
  list_card: {
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  modal: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "30%",
  },
  modal_text: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "600",
  },
});
