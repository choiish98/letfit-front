import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { API_URL } from "@env";
import Loader from "../Components/Loader";
import TopBar from "../Components/TopBar";

const Detail = (props) => {
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({
    id: 1,
    photo: "",
    like: [],
    poster: {
      username: "",
      avatar: "",
    },
    title: "",
    description: "",
    created_at: "",
  });

  // 게시글 정보 호출
  const getPostData = async () => {
    const response = await fetch(
      `https://forty-cooks-sin-121-146-124-174.loca.lt/api/posts/${props.route.params.id}/`,
      {
        headers: {
          method: "GET",
        },
      }
    );
    const thisPostData = await response.json();
    setPostData(thisPostData);
  };

  const firstAction = () => {
    console.log("로딩 중");
    getPostData();
    setLoading(false);
  };

  useEffect(() => {
    loading ? firstAction() : console.log("로딩 완료");
  });

  // 포스팅 날짜 추출
  const getPostDate = () => {
    const postDate = new Date(postData.created_at);
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
    return postData.like.length;
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <TopBar navigation={props.navigation} />
      <View style={styles.body}>
        <View style={[styles.photo, styles.photo4]} />
        <View style={[styles.photo, styles.photo3]} />
        <View style={[styles.photo, styles.photo2]} />
        <View style={styles.photo}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
            source={{
              uri:
                `https://forty-cooks-sin-121-146-124-174.loca.lt` +
                postData.photo,
            }}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.postInfo}>
            <View style={styles.posterInfo}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  marginRight: 10,
                  backgroundColor: "white",
                }}
                source={{
                  uri:
                    `https://forty-cooks-sin-121-146-124-174.loca.lt` +
                    postData.poster.avatar,
                }}
              />
              <View>
                <Text style={styles.text}>{postData.poster.username}</Text>
                <Text style={styles.subText}>{getPostDate()}</Text>
              </View>
            </View>
            <View style={styles.posterInfo}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                }}
                source={require("../Image/heart.png")}
              />
              <Text style={styles.text}>{getLikes()}</Text>
            </View>
          </View>
          <Text style={[styles.text, styles.content_text]}>
            {postData.title}
          </Text>
          <Text style={[styles.subText, styles.content_text]}>
            {postData.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Detail;
