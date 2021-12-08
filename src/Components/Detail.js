import React, { useEffect, useState } from "react";
import { View, Text, Image, AsyncStorage, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { API_URL } from "@env";
import Loader from "./Loader";

const Detail = (props) => {
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
    fetch(`https://bitter-jellyfish-92.loca.lt/api/posts/${props.route.params.id}/`, {
      headers: {
        "method": "GET",
      },
    })
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
    getPostData();
    setLoading(true);
  };

  useEffect(() => {
    loading === false
      ? firstAction()
      : console.log(postData.id);
  });
  
  const goHome = () => {
    props.navigation.navigate("Home");
  };

  return loading ? (
    <View>
      <TouchableOpacity activeOpacity={0.5} onPress={goHome}>
        <Text>go Home</Text>
      </TouchableOpacity>
      <View>
        <Image
          style={{ height: "50%", width: "50%" }}
          source={{ uri: `https://bitter-jellyfish-92.loca.lt` + postData.photo }}
        />
        <Text> username: {postData.poster.username} </Text>
        <Text> title: {postData.title} </Text>
        <Text> description: {postData.description} </Text>
        <Text> created at: {postData.created_at} </Text>
      </View>
    </View>
  ) : (
    Loader
  );
};

export default Detail;
