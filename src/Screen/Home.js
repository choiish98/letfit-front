import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  AsyncStorage,
  StyleSheet,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../Actions/userIndex";
import { routineActionCreators } from "../Actions/routineIndex";
import { API_URL } from "@env";
import Loader from "../Components/Loader";
import * as Progress from "react-native-progress";
import TopBar from "../Components/TopBar";
import FeedCard from "../Components/FeedCard";

// topbar 깨지는거 고칠 필요

const Home = (props) => {
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);

  const getUserData = async () => {
    try {
      // token 받아오기
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `https://sour-papers-grab-121-146-124-174.loca.lt/api/users/me/`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Authorization: `X-JWT ${token}`,
          },
        }
      );
      const userData = await response.json();

      props.defineUser(userData);
    } catch (error) {
      console.log("error in getUserData: " + error);
    }
  };

  const getRoutineData = async () => {
    try {
      const response = await fetch(
        `https://sour-papers-grab-121-146-124-174.loca.lt/api/routines/`,
        {
          method: "GET",
        }
      );
      const routineData = await response.json();

      props.defineRoutine(routineData);
    } catch (error) {
      console.log("error in getRoutinData: " + error);
    }
  };

  const loadingFeed = async () => {
    try {
      const response = await fetch(
        `https://sour-papers-grab-121-146-124-174.loca.lt/api/posts/trending/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const feedData = await response.json();

      setTrending(feedData);
    } catch (error) {
      console.log("error in loadingFeed: " + error);
    }
  };

  const firstAction = () => {
    console.log("로딩 중");
    getUserData();
    getRoutineData();
    loadingFeed();
    setLoading(false);
  };

  useEffect(() => {
    loading ? firstAction() : console.log("로딩 완료");
  });

  // 회원 탈퇴
  const secession = async () => {
    // 아이디가 같을 경우에만 보이게 수정 필요
    // 아이디가 같은지 검사 필요
    try {
      const token = await AsyncStorage.getItem("token");
      await fetch(
        `${`https://sour-papers-grab-121-146-124-174.loca.lt`}/api/users/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `X-JWT ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("error: " + error);
    }
  };

  // 로그 아웃
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

  const ItemView = (item, key) => {
    return (
      <View key={key} style={styles.eachItemView}>
        <FeedCard navigation={props.navigation} item={item} />
      </View>
    );
  };

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
    <View style={{ flex: 1 }}>
      <View>
        <TopBar navigation={props.navigation} Home />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#DEDEDE" }}
      >
        <View style={styles.userInfo}>
          <View style={styles.alignCenter}>
            <Text
              style={[styles.userInfo_days_upperText, { fontStyle: "italic" }]}
            >
              {daysComma()}
            </Text>
            <Text style={styles.userInfo_days_underText}> Days </Text>
          </View>
          <View style={styles.userInfo_tier_goal}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
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
                style={[styles.alignCenter, styles.userInfo_tier_goal_staff]}
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
            style={[styles.shadow, styles.alignCenter, styles.icons_each]}
          >
            <Image
              style={styles.icons_each_image}
              source={require("../Image/SNS.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={goExercise}
            style={[styles.icons_center, styles.alignCenter, styles.shadow]}
          >
            <Image
              style={styles.icons_center_image}
              source={require("../Image/Home.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={goSNS}
            style={[styles.icons_each, styles.alignCenter, styles.shadow]}
          >
            <Image
              style={styles.icons_each_image}
              source={require("../Image/gold.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.feed}>{trending.map(ItemView)}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    marginBottom: 20,
    backgroundColor: "#2A3042",
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
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  userInfo_tier_goal_staff: {
    width: 50,
    height: 50,
  },
  userInfo_tier_goal_text: {
    marginTop: 10,
    fontSize: 15,
    color: "#fff",
  },
  icons: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  icons_center: {
    width: 110,
    height: 110,
    borderRadius: 100,
    backgroundColor: "white",
  },
  icons_center_image: {
    width: 80,
    height: 80,
  },
  icons_each: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: "white",
  },
  icons_each_image: {
    width: 40,
    height: 40,
  },
  alignCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  eachItemView: {
    marginTop: 20,
    backgroundColor: "white",
    width: "90%",
    marginLeft: "5%",
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
