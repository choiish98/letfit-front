import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import Loader from "../Components/Loader";
import { actionCreators } from "../store";
import { API_URL } from "@env";

const SNS = (props) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    tier: "",
    profile_message: "",
    accumulated_exercise_day: 0,
    posts: [
        {
            id: "",
            photo: ""
        },
    ]
  });
  const [loading, setLoading] = useState(false);

  const getUserData = () => {
    // 유저 정보 호출
    fetch(`https://popular-wasp-90.loca.lt/api/users/1/`, {
      headers: {
        "method": "GET",
      },
    }).then((response) => response.json())
      .then((responseJson) => {
        // 유저 정보 저장
        setUserInfo(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const goHome = () => {
    props.navigation.replace("Home");
  };

  const goUpload = () => {
    props.navigation.replace("Upload");
  };

  const firstAction = () => {
    getUserData();
    setLoading(true);
  };

  useEffect(() => {
    loading === false
      ? firstAction()
      : console.log("user: " + userInfo.username);
  });

  const renderItem = ({ item }) => {
    const imageUrl = `https://old-chipmunk-19.loca.lt` + item.photo;

    return (
      <View>
        <Image
          style={{ height: "100%", width: "100%" }}
          source={{ uri: imageUrl }}
        />
        <Text>뜨냐고~</Text>
      </View>
    );
  };

  const renderPosts = () => {
    return (
      <FlatList
        data={userInfo.posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };

  return loading ? (
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Text> username: {userInfo.username} </Text>
          <Text> tier:  {userInfo.tier} </Text>
          <Text> pm: {userInfo.profile_message} </Text>
          <Text> ed: {userInfo.accumulated_exercise_day} </Text>
          <View>
            <TouchableOpacity activeOpacity={0.5} onPress={goHome}>
              <Text>go home</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.feed}>
          <TouchableOpacity activeOpacity={0.5} onPress={goUpload}>
            <Text>+</Text>
          </TouchableOpacity>
          {renderPosts()}
        </View>
      </View>
    ) : (
      Loader
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfo: {
    flex: 2,
  },
  feed: {
    flex: 2,
  },
});

function mapStateToProps(state) {
  return { user: state };
}

function mapDispatchToProps(dispatch) {
  return {
    defineUser: (user) => dispatch(actionCreators.defineUser(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SNS);