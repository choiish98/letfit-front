import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { API_URL } from "@env";
import Loader from "../Components/Loader";
import TopBar from "../Components/TopBar";

const Detail = (props) => {
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({});

  const getPostData = () => {
    // 게시글 정보 호출
    fetch(
      `https://forty-cooks-sin-121-146-124-174.loca.lt/api/posts/${props.route.params.id}/`,
      {
        headers: {
          method: "GET",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        // post data 저장
        setPostData(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const firstAction = () => {
    console.log("로딩 중");
    getPostData();
    setLoading(false);
  };

  useEffect(() => {
    loading ? firstAction() : console.log("로딩 완료");
  });

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
});

export default Detail;
