import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Calander = (props) => {
  const thisBodyParts = props.bodyParts;
  const dayNum = props.dayNum;

  // 부위 배열을 text로 하나씩 리턴
  const arrToText = (item) => {
    let result = [];

    item.split(",").map((thisItem, key) => {
      if (thisItem === "") {
        result.push(
          <Text key={key} style={styles.calader_day_reText}>
            휴식
          </Text>
        );
      } else {
        result.push(
          <Text key={key} style={styles.calader_day_exText}>
            {thisItem}
          </Text>
        );
      }
    });

    return <View>{result}</View>;
  };

  // 요일 한글 입력
  const day = () => {
    let result = "";

    switch (dayNum) {
      case 0:
        result = "월";
        break;
      case 1:
        result = "화";
        break;
      case 2:
        result = "수";
        break;
      case 3:
        result = "목";
        break;
      case 4:
        result = "금";
        break;
      case 5:
        result = "토";
        break;
      case 6:
        result = "일";
        break;
    }

    return result;
  };

  return (
    <View style={styles.calader_day}>
      <Text>{arrToText(thisBodyParts)}</Text>
      <View style={styles.calader_day_bar(props.isClicked)}></View>
      <Text style={{ marginBottom: 7 }}>{day()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  calader_day: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: 95,
  },
  calader_day_bar: (isClicked) => {
    const color = isClicked ? "#2A3042" : "#DEDEDE";

    return {
      justifyContent: "center",
      width: 30,
      backgroundColor: color,
      paddingTop: 7,
      marginTop: 7,
      marginBottom: 10,
    };
  },
});

export default Calander;
