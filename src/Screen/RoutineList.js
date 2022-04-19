import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { API_URL } from "@env";
import Loader from "../Components/Loader";

// 추천순 등 리스트 정렬 기능
// 순위 1, 2, 3 기능
// user profile image api

const RoutineList = (props) => {
  const [loading, setLoading] = useState(false);

  const firstAction = () => {
    setLoading(true);
  };

  useEffect(() => {
    loading === false ? firstAction() : console.log("전체 루틴 리스트 페이지");
  });

  const getUserProfile = (id) => {
    fetch(`https://heavy-wasp-16.loca.lt/api/users/${id}`, {
      headers: {
        method: "GET",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.avatar;
      });
    return "../Image/like_profile_base.png";
  };

  const renderItem = ({ item }) => {
    // hashTag thisTags에 저장
    var thisTags = [];
    item.hashtags.map((thisTag) => {
      thisTags.push("#" + thisTag.name + "  ");
    });

    // user profile 가져오기
    const userProfile = getUserProfile(item.creator.id);

    return (
      // item.id로 이동
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => console.log(item.id)}
      >
        <View>
          <View>
            <Text>1</Text>
          </View>
          <View>
            <Text>{item.name}</Text>
            <Text>{item.followers}</Text>
          </View>
        </View>
        <View>
          <Text>{thisTags}</Text>
          <View>
            <Text>{item.creator.username}</Text>
            <Image source={require("../Image/like_profile_base.png")} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFeed = () => {
    return (
      <FlatList
        data={props.user.routineData}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
      />
    );
  };

  const goHome = () => {
    props.navigation.replace("Home");
  };

  const goSearch = () => {
    console.log("listSearch");
  };

  const goMakeRoutine = () => {
    console.log("MakeRoutine");
  };

  return loading ? (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={goHome}
          style={styles.topbar_back}
        >
          <Image source={require("../Image/back_bnt.png")} />
        </TouchableOpacity>
        <Text style={styles.topbar_text}>LETFIT</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.body_topBox}>
          <Text style={styles.body_topBox_Text}>루틴리스트</Text>
          <Text>추천순</Text>
        </View>
        <TouchableOpacity activeOpacity={0.5} onPress={goMakeRoutine}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={goSearch}>
          <Text>검색</Text>
        </TouchableOpacity>
        <View>{renderFeed()}</View>
      </View>
    </View>
  ) : (
    Loader
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topbar: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#2A3042",
  },
  topbar_back: {},
  topbar_text: {
    textAlign: "center",
    fontSize: 25,
    color: "#2A3042",
    fontWeight: "600",
    paddingBottom: 15,
    color: "white",
  },
  body: {
    flex: 7.5,
    backgroundColor: "red",
  },
  body_topBox: {
    flex: 0.12,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "white",
  },
  body_topText: {
    justifyContent: "center",
    alignContent: "center",
    fontSize: 13,
    fontWeight: "600",
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

export default connect(mapStateToProps, mapDispatchToProps)(RoutineList);
