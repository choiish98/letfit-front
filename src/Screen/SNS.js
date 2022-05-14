import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { styles } from "../Styles/snsStyle";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../Components/Loader";
import TopBar from "../Components/TopBar";
import { imgSrc } from "../Components/ImgSrc";

// 팔로우/언팔로우 구분 구현 필요

const SNS = (props) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ posts: [] });
  const isFocused = useIsFocused;

  const follow = async () => {
    if (props.user.userData.id === props.route.params.id) {
      console.log("자기 자신을 팔로우 할 수 없습니다.");
      //} else if () {
      //  console.log("언팔로우");
    } else {
      try {
        const token = await AsyncStorage.getItem("token");
        await fetch(
          `https://shiny-turtles-jump-121-146-124-174.loca.lt/api/users/follow/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `X-JWT ${token}`,
            },
            body: JSON.stringify({ id: props.route.params.id }),
          }
        );
        console.log("구독 성공");
      } catch (error) {
        console.log("error in follow: " + error);
      }
    }
  };

  const getUserData = async () => {
    try {
      // 유저 정보 호출
      const response = await fetch(
        `https://shiny-turtles-jump-121-146-124-174.loca.lt/api/users/${props.route.params.id}`,
        {
          headers: {
            method: "GET",
          },
        }
      );
      const userInfoData = await response.json();
      setUserInfo(userInfoData);
    } catch (error) {
      console.log("error in getUserData: " + error);
    }
  };

  const firstAction = async () => {
    console.log("로딩 중");
    await getUserData();
    setLoading(false);
    console.log("로딩 완료");
  };

  useEffect(() => {
    firstAction();
  }, [isFocused]);

  const goEdit = () => {
    props.navigation.navigate("ProfileEdit", { userInfo });
  };

  // sns 주인이면 upload 버튼 생성
  const uploadBtn = () => {
    if (userInfo.username === props.user.userData.username)
      return (
        <View style={styles.feeds}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate("Upload")}
            style={styles.feed_uploadBtn}
          >
            <Text style={styles.feed_uploadBtn_text}>+</Text>
          </TouchableOpacity>
        </View>
      );
  };

  // feed rendering
  const itemView = (item, key) => {
    return (
      <View style={styles.feeds} key={key}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Detail", {
              id: item.id,
              isOwn: checkIsOwn(),
            });
          }}
        >
          <Image
            style={styles.feeds_card}
            source={{
              uri:
                `https://shiny-turtles-jump-121-146-124-174.loca.lt` +
                item.photo,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // day 천 자리 넘을 경우 콤마 찍어서 리턴
  const daysComma = () => {
    const days = userInfo.accumulated_exercise_day;
    return days > 1000 ? parseInt(days / 1000) + "," + (days % 1000) : days;
  };

  // 팔로우 or 수정
  const followOrEdit = () => {
    if (checkIsOwn()) {
      goEdit();
    } else {
      follow();
    }
  };

  // 구독 Or 수정
  const subscribeOrEdit = () => {
    if (checkIsOwn()) {
      return "수정";
    } else {
      return "구독";
    }
  };

  // 주인인지 검사
  const checkIsOwn = () => {
    return userInfo.username === props.user.userData.username;
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <TopBar navigation={props.navigation} SNS />
      <View style={styles.body}>
        <View style={styles.userInfo}>
          <View style={styles.userInfo_upperInfo}>
            <View style={styles.userInfo_upperInfo_each}>
              <View style={styles.tier_img_box}>
                <Image style={styles.tier_img} source={imgSrc(userInfo.tier)} />
              </View>
              <Text style={{ fontSize: 13 }}> {userInfo.tier} </Text>
            </View>
            <View style={styles.userInfo_upperInfo_each}>
              <Text style={styles.userInfo_upperInfo_days}>{daysComma()}</Text>
              <Text style={{ fontSize: 13 }}> Days </Text>
            </View>
            <View style={styles.userInfo_upperInfo_each}>
              <Text style={{ fontSize: 35 }}>{userInfo.follower_count}</Text>
              <Text style={{ fontSize: 13 }}> FAN </Text>
            </View>
          </View>
          <View style={styles.userInfo_underInfo}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 25, marginRight: 5 }}>
                {userInfo.username}
              </Text>
            </View>
            <TouchableOpacity
              onPress={followOrEdit}
              style={styles.userInfo_underInfo_follow}
            >
              <Text style={styles.userInfo_underInfo_follow_text}>
                {subscribeOrEdit()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.feed}>
          <View style={styles.profile}>
            <Image
              style={styles.profile_img}
              source={{
                uri:
                  `https://shiny-turtles-jump-121-146-124-174.loca.lt` +
                  `/media/81051548428941cb8d27828557a3f06b..jpg`,
              }}
            />
          </View>
          <View style={styles.feed_profile_message}>
            <Text style={styles.feed_profile_message_text}>
              {userInfo.profile_message}
            </Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {uploadBtn()}
            {userInfo.posts.map(itemView)}
          </View>
        </View>
      </View>
    </View>
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
