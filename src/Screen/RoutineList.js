import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import Modal from "react-native-modal";
import { API_URL } from "@env";
import { styles } from "../Styles/routineList";
import TopBar from "../Components/TopBar";
import Loader from "../Components/Loader";

// 순위 1, 2, 3 기능
// user profile image api

const RoutineList = (props) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [renderRoutine, setRenderRoutine] = useState([]); // 전체 운동 저장

  const firstAction = () => {
    setRenderRoutine(props.user.routineData);
    setLoading(true);
  };

  useEffect(() => {
    loading === false ? firstAction() : console.log("전체 루틴 리스트 페이지");
  });

  const getUserProfile = (id) => {
    fetch(`https://sour-papers-grab-121-146-124-174.loca.lt/api/users/${id}`, {
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
        onPress={() => goDetail(item.id)}
        style={styles.list_card}
      >
        <View style={styles.list_top}>
          <View style={styles.list_top_rank}>
            <Text style={styles.list_top_rank_text}>1</Text>
            <Text style={styles.list_top_rank_underLine}> </Text>
          </View>
          <View style={styles.list_top_rank_info}>
            <Text style={styles.list_top_rank_info_name}>{item.name}</Text>
            <Text style={styles.list_top_rank_info_follow}>
              {item.followers}명이 팔로우 중
            </Text>
          </View>
        </View>
        <View style={styles.list_bottom}>
          <Text style={styles.list_hashtags}>{thisTags}</Text>
          <View style={styles.list_bottom_creator}>
            <Text style={styles.list_bottom_creator_username}>
              {item.creator.username}
            </Text>
            <Image
              source={require("../Image/like_profile_base.png")}
              style={styles.list_bottom_creator_img}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFeed = () => {
    return (
      <FlatList
        data={renderRoutine}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
      />
    );
  };

  const goSearch = () => {
    props.navigation.navigate("Search", {
      routineData: props.user.routineData,
    });
  };

  const goDetail = (id) => {
    props.navigation.navigate("RoutineDetail", id);
  };

  const goMakeRoutine = () => {
    props.navigation.navigate("MakeRoutine");
  };

  // 정렬 기능 - 팔로우
  const followSort = () => {
    let thisRoutine = renderRoutine;
    thisRoutine.sort((a, b) => {
      return a.followers - b.followers;
    });

    setRenderRoutine(thisRoutine);
    toggleModal();
  };

  // 정렬 기능 - 티어
  const tierSort = () => {
    let thisRoutine = renderRoutine;
    thisRoutine.sort((a, b) => {
      return b.followers - a.followers;
    });

    setRenderRoutine(thisRoutine);
    toggleModal();
  };

  // 모달 on/off
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return loading ? (
    <View style={styles.container}>
      <TopBar navigation={props.navigation} />
      <View style={styles.body}>
        <View style={styles.body_topBox}>
          <Text style={styles.body_topBox_Text}>루틴리스트</Text>
          <View style={styles.body_topBox_sort}>
            <TouchableOpacity activeOpacity={0.5} onPress={toggleModal}>
              <Text style={styles.body_topBox_sort_text}>추천순</Text>
            </TouchableOpacity>
            <Image
              source={require("../Image/sort_bnt.png")}
              style={styles.body_topBox_btn}
            />
          </View>
        </View>
        <View style={styles.body_toolBox}>
          <View style={styles.body_toolBox_left}>
            <TouchableOpacity activeOpacity={0.5} onPress={goMakeRoutine}>
              <Image
                source={require("../Image/routine_add_bnt.png")}
                style={styles.body_toolBox_add}
              />
            </TouchableOpacity>
            <Text>내 루틴 만들기</Text>
          </View>
          <TouchableOpacity activeOpacity={0.5} onPress={goSearch}>
            <Image
              source={require("../Image/serach_bnt.png")}
              style={styles.body_toolBox_search}
            />
          </TouchableOpacity>
        </View>
        <Modal isVisible={isModalVisible} backdropColor="white">
          <View style={styles.modal}>
            <View>
              <TouchableOpacity activeOpacity={0.5} onPress={followSort}>
                <Text style={styles.modal_text}>팔로우순</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={tierSort}>
                <Text style={styles.modal_text}>티어순</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={toggleModal}>
              <Image source={require("../Image/routine_del_work_bnt.png")} />
            </TouchableOpacity>
          </View>
        </Modal>
        <View>{renderFeed()}</View>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(RoutineList);
