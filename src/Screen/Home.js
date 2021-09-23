import React, { useEffect, useState } from "react";
import { View, Text, Image, AsyncStorage } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { API_URL } from "@env";
import Loader from "../Components/Loader";

const Home = (props) => {
  console.log(API_URL);
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    (loading === false) ? (
      // token 받아오기
      AsyncStorage.getItem("token").then((token) => {
        // token 값이 없으면 로그인 화면으로 이동
        if(token === null) {
          props.navigation.replace("Auth");
        }

        // 유저 정보 호출
        fetch(`${API_URL}/api/users/me/`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Authorization: `X-JWT ${token}`,
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            // 유저 정보 리덕스 저장
            props.defineUser(responseJson);
          })
          .catch((error) => {
            console.log(error);
          })
      }),

      fetch(`${API_URL}/api/posts/trending/`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
            setTrending(responseJson);
        }),

      setLoading(true)
    ) : (console.log("user: " + props.user.username));
  })

  const logout = async () => {
    props.deleteUser();
    await AsyncStorage.removeItem("token");
    props.navigation.replace("Auth");
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <Image source={{uri:API_URL + item.photo}} />
        <Text>{item.title}</Text>
        <Text>{item.username}</Text>
        <Text>{item.description}</Text>
        <Text>{item.createAt}</Text>
      </View>
    )
  }

  return (
    (loading) ? (
      <View>
        <TouchableOpacity activeOpacity={0.5} onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <View>
          <Text> Hello {props.user.username} </Text>
          <Text> Your tier: {props.user.tier} </Text>
          <Text> Your Email: {props.user.email} </Text>
        </View>
        <View>
          <FlatList 
            data={trending}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}  
          />
        </View>
      </View>
    ) : (Loader)
  );
};

function mapStateToProps(state) {
  return { user: state };
}

function mapDispatchToProps(dispatch) {
  return {
    defineUser: (user) => dispatch(actionCreators.defineUser(user)),
    deleteUser: () => dispatch(actionCreators.deleteUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
