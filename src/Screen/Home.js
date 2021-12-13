import React, { useEffect, useState } from "react";
import { View, Text, Image, AsyncStorage, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { API_URL } from "@env";
import Loader from "../Components/Loader";

const Home = (props) => {
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState([]);

  const getUserData = () => {
    // token 받아오기
    AsyncStorage.getItem("token")
      .then((token) => {

        // 유저 정보 호출
        fetch(`https://lazy-starfish-99.loca.lt//api/users/me/`, {
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
          });
      })
      .catch((error) => {
        console.log("error occurred at async storage");
        console.log("error: " + error);
        props.navigation.replace("Auth");
      });
  };

  const loadingFeed = () => {
    fetch(`https://lazy-starfish-99.loca.lt//api/posts/trending/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setTrending(responseJson);
        console.log("피드 업데이트 완료");
      });
  };

  const homeAction = () => {
    getUserData();
    loadingFeed();
    setLoading(true);
  };

  useEffect(() => {
    loading === false
      ? homeAction()
      : console.log("user: " + props.user.username);
  });

  const renderItem = ({ item }) => {
    const imageUrl = `https://lazy-starfish-99.loca.lt/` + item.photo;

    return (
      <TouchableOpacity  
        onPress={() => {
            props.navigation.replace("Detail", {id: item.id});
          }
        }>
          <View>
            <Image
              style={{ height: "95%", width: "15%" }}
              source={{ uri: imageUrl }}
            />
            <Text>{item.title}</Text>
            <Text>{item.username}</Text>
            <Text>{item.description}</Text>
            <Text>{item.created_at}</Text>
          </View>
      </TouchableOpacity>
    );
  };

  const logout = async () => {
    props.deleteUser();
    await AsyncStorage.removeItem("token");
    props.navigation.replace("Auth");
  };

  const goSNS = () => {
    props.navigation.replace("SNS");
  };

  const renderFeed = () => {
    return (
      <FlatList
        data={trending}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };

  return loading ? (
    <View style={styles.container}>
      <View>
        <TouchableOpacity activeOpacity={0.5} onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={goSNS}>
          <Text>SNS</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        <Text> Hello {props.user.username} </Text>
        <Text> Your tier: {props.user.tier} </Text>
        <Text> Your Email: {props.user.email} </Text>
      </View>
      <View style={styles.feed}>{renderFeed()}</View>
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
    deleteUser: () => dispatch(actionCreators.deleteUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
