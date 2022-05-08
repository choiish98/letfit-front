import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ExerciseCard = (props) => {
  const item = props.item;

  return (
    <View style={styles.todayExerciseCard}>
      <Text style={styles.todayExerciseCard_text_grey}>{item.body_part}</Text>
      <Text style={styles.todayExerciseCard_text}>{item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  todayExerciseCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    backgroundColor: "#DEDEDE",
    color: "#2A3042",
    margin: 10,
  },
  todayExerciseCard_text_grey: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: "600",
    color: "#7F7F80",
  },
  todayExerciseCard_text: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: "600",
    color: "#242A3D",
  },
});

export default ExerciseCard;
