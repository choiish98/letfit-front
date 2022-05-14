import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const FeedCard = (props) => {
  const item = props.item;
  const imageUrl =
    `https://shiny-turtles-jump-121-146-124-174.loca.lt` + item.photo;
  const isOwn = props.id === item.poster.id;

  // 포스팅 날짜 추출
  const getPostDate = () => {
    const postDate = new Date(item.created_at);
    const year = postDate.getFullYear();
    const month = postDate.getMonth() + 1;
    const date = postDate.getDate();
    const hour = postDate.getHours();
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();
    const todayHour = today.getHours();

    if (todayYear !== year) {
      return year + "년 " + month + "월 " + date + "일";
    } else if (todayYear === year && todayMonth !== month) {
      return month + "월 " + date + "일 ";
    } else if (
      todayYear === year &&
      todayMonth === month &&
      todayDate !== date
    ) {
      return String(todayDate - date) + "일 전";
    } else {
      return String(todayHour - hour) + "시간 전";
    }
  };

  // 좋아요 개수 추출
  const getLikes = () => {
    return item.like.length;
  };

  return (
    <View>
      <View style={styles.postInfo}>
        <View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("SNS", { id: item.poster.id });
            }}
            style={styles.posterInfo}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
                marginRight: 10,
                backgroundColor: "white",
                borderWidth: 0.5,
                borderColor: "#DEDEDE",
              }}
              source={{
                uri:
                  `https://shiny-turtles-jump-121-146-124-174.loca.lt` +
                  item.poster.avatar,
              }}
            />
            <View>
              <Text style={styles.text}>{item.poster.username}</Text>
              <Text style={styles.subText}>{getPostDate()}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.posterInfo}>
          <Image
            style={{
              width: 20,
              height: 20,
              marginRight: 10,
            }}
            source={require("../../assets/Icon/heart.png")}
          />
          <Text style={styles.text}>{getLikes()}</Text>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Detail", { id: item.id, isOwn: isOwn });
          }}
        >
          <Image style={styles.feed_box} source={{ uri: imageUrl }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    padding: 10,
  },
  posterInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "black",
  },
  subText: {
    fontSize: 12,
    color: "black",
  },
  feed_box: {
    width: "100%",
    height: 300,
  },
});

export default FeedCard;
