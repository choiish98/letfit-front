import React, { useEffect, useState } from "react";
import { View, Text, Image, AsyncStorage, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { API_URL } from "@env";
import Loader from "./Loader";

const Detail = (props) => {
  console.log(props.route.params.id);

  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({
    id: "",
    photo: "",
    like: [
      {
        username: ""
      }
    ],
    poster: {
      username: "",
      id: "",
      avatar: "",
    },
    title: "",
    description: "",
    created_at: "",
  });

  const getPostData = () => {
    // 유저 정보 호출
    fetch(`http://7fa7-123-214-10-136.ngrok.io/posts/${props.route.params.id}/`, {
      headers: {
        "method": "GET",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setPostData(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const firstAction = () => {
    getPostData();
    setLoading(true);
  };

  useEffect(() => {
    loading === false
      ? firstAction()
      : console.log(postData.username);
  });
  
  const goHome = () => {
    props.navigation.navigate("Home");
  };

  return loading ? (
    <View>
      <Text> Hello </Text>
      <TouchableOpacity activeOpacity={0.5} onPress={goHome}>
        <Text>go Home</Text>
      </TouchableOpacity>
    </View>
  ) : (
    Loader
  );
};

export default Detail;
