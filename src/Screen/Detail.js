import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import Loader from "../Components/Loader";
import TopBar from "../Components/TopBar";
import { styles } from "../Styles/detailStyle";

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
      `https://new-bobcats-spend-121-146-124-174.loca.lt/api/posts/${props.route.params.id}/`,
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

  // 게시글 삭제
  const deleteFeed = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await fetch(
        `https://new-bobcats-spend-121-146-124-174.loca.lt/api/posts/${props.route.params.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `X-JWT ${token}`,
          },
        }
      );
      props.navigation.goBack();
    } catch (error) {
      console.log("error in delete: " + error);
    }
  };

  // 본인 게시글이면 수정, 삭제 기능 추가
  const isOwnDetail = () => {
    if (props.route.params.isOwn)
      return (
        <View style={styles.btn}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btn_box}
            onPress={() => console.log("pressed")}
          >
            <Text style={styles.btn_text}>수정</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btn_box}
            onPress={deleteFeed}
          >
            <Text style={styles.btn_text}>삭제</Text>
          </TouchableOpacity>
        </View>
      );
  };

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
                `https://new-bobcats-spend-121-146-124-174.loca.lt` +
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
                    `https://new-bobcats-spend-121-146-124-174.loca.lt` +
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
          <View style={{ height: 200, marginBottom: 50 }}>
            <Text style={[styles.text, styles.content_text]}>
              {postData.title}
            </Text>
            <Text style={[styles.subText, styles.content_text]}>
              {postData.description}
            </Text>
          </View>
          {isOwnDetail()}
        </View>
      </View>
    </View>
  );
};

export default Detail;
