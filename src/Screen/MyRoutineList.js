import React, { useEffect, useState } from "react";
import { View, Text, Image, AsyncStorage, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { API_URL } from "@env";
import Loader from "../Components/Loader";

const MyRoutineList = (props) => {
    const [loading, setLoading] = useState(true);

//   const getRoutineData = () => {
//     // token 받아오기
//     AsyncStorage.getItem("token")
//       .then((token) => {

//         // 유저 정보 호출
//         fetch(`https://little-bulldog-37.loca.lt//api/users/me/`, {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
//             Authorization: `X-JWT ${token}`,
//           },
//         })
//           .then((response) => response.json())
//           .then((responseJson) => {
//             // 유저 정보 리덕스 저장
//             props.defineUser(responseJson);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       })
//       .catch((error) => {
//         console.log("error occurred at async storage");
//         console.log("error: " + error);
//         props.navigation.replace("Auth");
//       });
//   };

//   const MyRoutineListAction = () => {
//     getRoutineData();
//     setLoading(true);
//   };

//   useEffect(() => {
//     loading === false
//       ? MyRoutineListAction()
//       : console.log("user: " + props.user.username);
//   });

  const goHome = () => {
    props.navigation.replace("Home");
  };

  return loading ? (
    <View>
        <Text>Hello</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={goHome}>
          <Text>Home</Text>
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
    deleteUser: () => dispatch(actionCreators.deleteUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRoutineList);
