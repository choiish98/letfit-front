import React, { useEffect, useState } from "react";
import { View, Text, Image, AsyncStorage, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../Actions/userIndex";
import { routineActionCreators } from "../Actions/routineIndex";
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
        fetch(`https://wet-emu-68.loca.lt/api/users/me/`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Authorization: `X-JWT ${token}`,
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            // 유저 정보 리덕스 저장
            props.defineUser(responseJson);
            console.log("유저 데이터 업데이트 완료");
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

  const getRoutineData = () => {
    fetch(`https://wet-emu-68.loca.lt/api/routines/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // 루틴 정보 리덕스 저장
        props.defineRoutine(responseJson);
        console.log("루틴 업데이트 완료");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadingFeed = () => {
    fetch(`https://wet-emu-68.loca.lt/api/posts/trending/`, {
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
    getRoutineData();
    loadingFeed();
    setLoading(true);
  };

  useEffect(() => {
    loading === false
      ? homeAction()
      : console.log(
          "user: " +
            JSON.stringify(props.user) +
            "\nroutine: " +
            JSON.stringify(props.routine)
        );
  });

  const renderItem = ({ item }) => {
    const imageUrl = `https://wet-emu-68.loca.lt` + item.photo;

    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.replace("Detail", { id: item.id });
        }}
      >
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

  const secession = () => {
    // 아이디가 같을 경우에만 보이게 수정 필요
    // 아이디가 같은지 검사 필요
    // AsyncStorage.getItem("token")
    //   .then((token) => {
    //     fetch(`${`https://wet-emu-68.loca.lt`}/api/users/`, {
    //       method: "DELETE",
    //       headers: {
    //         Authorization: `X-JWT ${token}`,
    //       },
    //     }).catch((error) => {
    //         console.error(error);
    //       });
    //   })
    //   .catch((error) => {
    //     console.log("error occurred at async storage");
    //     console.log("error: " + error);
    //   });
  };

  const logout = async () => {
    props.deleteUser();
    await AsyncStorage.removeItem("token");
    props.navigation.replace("Auth");
  };

  const goSNS = () => {
    props.navigation.replace("SNS");
  };

  const goExercise = () => {
    props.navigation.replace("MyRoutineList");
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
        <TouchableOpacity activeOpacity={0.5} onPress={goExercise}>
          <Text>Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={secession}>
          <Text>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        <Text> Hello {props.user.username} </Text>
        <Text> Your tier: {props.user.tier} </Text>
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
    backgroundColor: "grey",
    margin: 15,
  },
});

function mapStateToProps(state) {
  return {
    user: state.userData,
    routine: state.routineData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    defineUser: (user) => dispatch(actionCreators.defineUser(user)),
    deleteUser: () => dispatch(actionCreators.deleteUser()),
    defineRoutine: (routine) =>
      dispatch(routineActionCreators.defineRoutine(routine)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
