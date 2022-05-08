import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, AsyncStorage } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import Loader from "../Components/Loader";
import { actionCreators } from "../store";
import { API_URL } from "@env";
import TopBar from "../Components/TopBar";

// 피드 가로로 넘치는거 정렬 필요

const SNS = (props) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ posts: [] });

  const follow = () => {
    // 언팔로우 구현 필요
    if (props.user.userData.id === props.route.params.id) {
      console.log("자기 자신을 팔로우 할 수 없습니다.");
      //} else if () {
      //  console.log("언팔로우");
    } else {
      AsyncStorage.getItem("token")
        .then((token) => {
          fetch(
            `https://forty-cooks-sin-121-146-124-174.loca.lt/api/users/follow/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `X-JWT ${token}`,
              },
              body: JSON.stringify({ id: props.route.params.id }),
            }
          )
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(JSON.stringify(responseJson));
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.log("error occurred at async storage");
          console.log("error: " + error);
        });
    }
  };

  const getUserData = () => {
    // 유저 정보 호출
    fetch(
      `https://forty-cooks-sin-121-146-124-174.loca.lt/api/users/${props.route.params.id}`,
      {
        headers: {
          method: "GET",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        // 유저 정보 저장
        setUserInfo(responseJson);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  const firstAction = () => {
    console.log("로딩 중");
    getUserData();
    setLoading(false);
  };

  useEffect(() => {
    loading ? firstAction() : console.log("로딩 완료");
  });

  const goUpload = () => {
    props.navigation.navigate("Upload");
  };

  const goEdit = () => {
    props.navigation.navigate("ProfileEdit", { userInfo });
  };

  const renderFeeds = () => {
    let photos = [];

    if (userInfo.username === props.user.userData.username) {
      photos.push(
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={goUpload}
            style={styles.feed_uploadBtn}
          >
            <Text style={styles.feed_uploadBtn_text}>+</Text>
          </TouchableOpacity>
        </View>
      );
    }

    userInfo.posts.map((item) => {
      photos.push(
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Detail", { id: item.id });
          }}
          key={item.id}
        >
          <Image
            style={styles.feeds_card}
            source={{
              uri:
                `https://forty-cooks-sin-121-146-124-174.loca.lt` + item.photo,
            }}
          />
        </TouchableOpacity>
      );
    });

    return <View style={styles.feeds}>{photos}</View>;
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
              <Image
                style={styles.userInfo_tier_goal_staff}
                source={require("../Image/gold.png")}
                width={50}
                height={50}
              />
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
              activeOpacity={0.5}
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
              style={styles.userInfo_tier_goal_staff}
              source={{
                uri:
                  `https://forty-cooks-sin-121-146-124-174.loca.lt` +
                  `/media/81051548428941cb8d27828557a3f06b..jpg`,
              }}
              width={180}
              height={180}
              borderRadius={100}
            />
          </View>
          <View style={styles.feed_profile_message}>
            <Text style={styles.feed_profile_message_text}>
              {userInfo.profile_message}
            </Text>
          </View>
          {renderFeeds()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 7.5,
  },
  userInfo: {
    flex: 1,
    backgroundColor: "#DEDEDE",
  },
  userInfo_upperInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  userInfo_upperInfo_each: {
    width: 100,
    height: 80,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  userInfo_upperInfo_days: {
    fontSize: 44,
    fontWeight: "600",
  },
  userInfo_underInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 50,
  },
  userInfo_underInfo_follow: {
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 28,
    backgroundColor: "#2A3042",
  },
  userInfo_underInfo_follow_text: {
    fontSize: 20,
    color: "white",
  },
  profile: {
    position: "absolute",
    bottom: "85%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#F9F5EE",
    width: 180,
    height: 180,
    borderRadius: 150,
  },
  feed: {
    flex: 3,
    backgroundColor: "#2A3042",
  },
  feed_profile_message: {
    paddingTop: 100,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  feed_profile_message_text: {
    fontSize: 18,
    color: "white",
  },
  feeds: {
    flex: 5,
    flexDirection: "row",
    width: "100%",
  },
  feed_uploadBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEDEDE",
    margin: 5,
    width: 120,
    height: 120,
  },
  feed_uploadBtn_text: {
    fontSize: 80,
    fontWeight: "600",
    color: "grey",
  },
  feeds_card: {
    margin: 5,
    width: 120,
    height: 120,
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
