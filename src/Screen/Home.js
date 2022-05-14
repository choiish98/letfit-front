import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../Actions/userIndex";
import { styles } from "../Styles/homeStyle";
import Loader from "../Components/Loader";
import * as Progress from "react-native-progress";
import TopBar from "../Components/TopBar";
import FeedCard from "../Components/FeedCard";
import { imgSrc } from "../Components/ImgSrc";

const Home = (props) => {
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);

  const getUserData = async () => {
    try {
      // token 받아오기
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `https://shiny-turtles-jump-121-146-124-174.loca.lt/api/users/me/`,
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

  const loadingFeed = async () => {
    try {
      const response = await fetch(
        `https://shiny-turtles-jump-121-146-124-174.loca.lt/api/posts/trending/`,
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

  const firstAction = async () => {
    console.log("로딩 중");
    await getUserData();
    await loadingFeed();
    await setLoading(false);
  };

  useEffect(() => {
    loading ? firstAction() : console.log("로딩 완료");
  }, [loading]);

  // 회원 탈퇴
  const secession = async () => {
    // 아이디가 같을 경우에만 보이게 수정 필요
    // 아이디가 같은지 검사 필요
    try {
      const token = await AsyncStorage.getItem("token");
      await fetch(
        `${`https://shiny-turtles-jump-121-146-124-174.loca.lt`}/api/users/`,
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

  // feed item
  const ItemView = (item, key) => {
    return (
      <View key={key} style={styles.eachItemView}>
        <FeedCard
          navigation={props.navigation}
          item={item}
          id={props.user.id}
        />
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

  const onRefresh = () => {
    setLoading(true);
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={{ flex: 1, backgroundColor: "#2A3042" }}>
      <View
        style={{
          flex: 0.8,
          justifyContent: "flex-end",
          backgroundColor: "#2A3042",
        }}
      >
        <TopBar navigation={props.navigation} Home />
      </View>
      <View style={{ backgroundColor: "#DEDEDE", flex: 7.5 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#DEDEDE" }}
          refreshControl={
            <RefreshControl refresh={!loading} onRefresh={onRefresh} />
          }
          stickyHeaderIndices={[1]}
        >
          <View style={styles.userInfo}>
            <View style={styles.alignCenter}>
              <Text style={[styles.userInfo_days_upperText]}>
                {daysComma()}
              </Text>
              <Text style={styles.userInfo_days_underText}> Days </Text>
            </View>
            <View style={styles.userInfo_tier_goal}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={styles.tier_img_box}>
                  <Image
                    style={styles.userInfo_tier_goal_staff}
                    source={imgSrc(props.user.tier)}
                  />
                </View>
                <Text style={styles.userInfo_tier_goal_text}>
                  {props.user.tier}
                </Text>
              </View>
              <View>
                <Progress.Circle
                  progress={goalProgress()}
                  style={[styles.alignCenter, styles.userInfo_tier_goal_staff]}
                  animated={true}
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
          <View>
            <View style={styles.icons}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={goList}
                style={[styles.shadow, styles.alignCenter, styles.icons_each]}
              >
                <Image
                  style={styles.icons_each_image}
                  source={require("../../assets/Icon/SNS.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={goExercise}
                style={[styles.icons_center, styles.alignCenter, styles.shadow]}
              >
                <Image
                  style={styles.icons_center_image}
                  source={require("../../assets/Icon/Home.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={goSNS}
                style={[styles.icons_each, styles.alignCenter, styles.shadow]}
              >
                <Image
                  style={styles.icons_each_image}
                  source={require("../../assets/Icon/gold.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.feed}>{trending.map(ItemView)}</View>
        </ScrollView>
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    user: state.userData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    defineUser: (user) => dispatch(actionCreators.defineUser(user)),
    deleteUser: () => dispatch(actionCreators.deleteUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
