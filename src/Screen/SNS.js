import React, { useEffect, useState } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import Loader from "../Components/Loader";
import { actionCreators } from "../store";

const SNS = (props) => {
  const [guestUser, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const goMain = () => {
    props.navigation.replace("Home");
  };

  const getUserData = () => {
    // token 받아오기
    AsyncStorage.getItem("token")
      .then((token) => {
        // 유저 정보 호출
        fetch(`http://6baa-220-84-188-32.ngrok.io/api/users/11/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Authorization: `X-JWT ${token}`,
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);

            // 유저 정보 리덕스 저장
            setUser(responseJson);
            console.log(guestUser);
          })
          .catch((error) => {
            console.log(error);
          });
        setLoading(true);
      })
      .catch((error) => {
        console.log("error occured at asyncstorage");
        console.log("error: " + error);
        props.navigation.replace("Auth");
      });
  };

  useEffect(() => {
    loading === false ? getUserData() : console.log(error);
  });

  return loading ? (
    <View>
      <View>
        <Text> {guestUser.tier} </Text>
        <Text> {guestUser.accumulated_exercise_day} </Text>
        <Text> {guestUser.username} </Text>
      </View>
      <Text> {guestUser.profile_message} </Text>
      <TouchableOpacity activeOpacity={0.5} onPress={goMain}>
        <Text>Main</Text>
      </TouchableOpacity>
    </View>
  ) : (
    Loader
  );
};

function mapStateToProps(state) {
  return { user: state };
}

function mapDispatchToProps(dispatch) {
  return {
    defineUser: (user) => dispatch(actionCreators.defineUser(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SNS);