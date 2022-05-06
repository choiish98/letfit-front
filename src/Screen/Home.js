import React, { useEffect, useState } from "react";
import { View, Text, Image, AsyncStorage, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../Actions/userIndex";
import { routineActionCreators } from "../Actions/routineIndex";
import { API_URL } from "@env";
import Loader from "../Components/Loader";
import * as Progress from "react-native-progress";
import TopBar from "../Components/TopBar";

const Home = (props) => {
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);

  const getUserData = () => {
    // token 받아오기
    AsyncStorage.getItem("token")
      .then((token) => {
        // 유저 정보 호출
        fetch(
          `https://silver-spoons-punch-121-146-124-174.loca.lt/api/users/me/`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
              Authorization: `X-JWT ${token}`,
            },
          }
        )
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
    fetch(`https://silver-spoons-punch-121-146-124-174.loca.lt/api/routines/`, {
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
    fetch(
      `https://silver-spoons-punch-121-146-124-174.loca.lt/api/posts/trending/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setTrending(responseJson);
        console.log("피드 업데이트 완료");
      });
  };

  const homeAction = () => {
    console.log("로딩 중");
    getUserData();
    getRoutineData();
    loadingFeed();
    setLoading(false);
  };

  useEffect(() => {
    loading ? homeAction() : console.log("로딩 완료");
  });

  const renderItem = ({ item }) => {
    const imageUrl =
      `https://silver-spoons-punch-121-146-124-174.loca.lt` + item.photo;

    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Detail", { id: item.id });
        }}
      >
        <View>
          <Image style={styles.feed_box} source={{ uri: imageUrl }} />
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
    //     fetch(`${`https://silver-spoons-punch-121-146-124-174.loca.lt`}/api/users/`, {
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
    props.navigation.navigate("SNS", { id: props.user.id });
  };

  const goExercise = () => {
    props.navigation.navigate("MyRoutineList");
  };

  const goList = () => {
    props.navigation.navigate("RoutineList");
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

  // <TouchableOpacity activeOpacity={0.5} onPress={secession}>
  //   <Text>회원탈퇴</Text>
  // </TouchableOpacity>

  // day 천 자리 넘을 경우 콤마 찍어서 리턴
  const daysComma = () => {
    const days = props.user.accumulated_exercise_day;
    return days > 1000 ? parseInt(days / 1000) + "," + (days % 1000) : days;
  };

  // progress bar 게이지 계산
  const goalProgress = () => {
    return props.user.exercise_success_number / props.user.exercise_goal_number;
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <TopBar navigation={props.navigation} Home />
        <View style={styles.userInfo_days}>
          <Text style={styles.userInfo_days_upperText}>{daysComma()}</Text>
          <Text style={styles.userInfo_days_underText}> Days </Text>
        </View>
        <View style={styles.userInfo_tier_goal}>
          <View>
            <Image
              style={styles.userInfo_tier_goal_staff}
              source={require("../Image/gold.png")}
            />
            <Text style={styles.userInfo_tier_goal_text}>
              {props.user.tier}
            </Text>
          </View>
          <View>
            <Progress.Circle
              progress={goalProgress()}
              style={styles.userInfo_tier_goal_staff}
              color="white"
              thickness={6}
              strokeCap="square"
              borderColor="#2A3042"
            />
            <Text style={styles.userInfo_tier_goal_text}>
              Goal {props.user.exercise_success_number}/
              {props.user.exercise_goal_number}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={goList}
          style={styles.icons_each}
        >
          <Image
            style={styles.icons_each_image}
            source={require("../Image/SNS.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={goExercise}
          style={styles.icons_center}
        >
          <Image
            style={styles.icons_center_image}
            source={require("../Image/Home.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={goSNS}
          style={styles.icons_each}
        >
          <Image
            style={styles.icons_each_image}
            source={require("../Image/gold.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.feed}>{renderFeed()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfo: {
    flex: 1.7,
    paddingTop: 10,
    marginBottom: 20,
    backgroundColor: "#2A3042",
  },
  userInfo_days: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo_days_upperText: {
    fontSize: 90,
    color: "#fff",
  },
  userInfo_days_underText: {
    fontSize: 20,
    color: "#fff",
  },
  userInfo_tier_goal: {
    flex: 1,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  userInfo_tier_goal_staff: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  userInfo_tier_goal_text: {
    marginTop: 10,
    fontSize: 15,
    color: "#fff",
  },
  icons: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  icons_center: {
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    height: 110,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#DEDEDE",
  },
  icons_center_image: {
    width: 80,
    height: 80,
  },
  icons_each: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#DEDEDE",
  },
  icons_each_image: {
    width: 40,
    height: 40,
  },
  feed: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEDEDE",
    marginTop: 50,
    margin: 20,
  },
  feed_box: {
    width: "100%",
    height: 100,
    marginTop: 20,
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
