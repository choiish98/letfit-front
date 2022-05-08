import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import Modal from "react-native-modal";
import { API_URL } from "@env";
import Loader from "../Components/Loader";
import TopBar from "../Components/TopBar";

const RoutineList = (props) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [entireRoutine, setEntireRoutine] = useState([]); // 전체 운동 루틴
  const [renderRoutine, setRenderRoutine] = useState([]); // 렌더링 운동 저장
  const [context, setContext] = useState(""); // 검색어

  const firstAction = () => {
    setEntireRoutine(props.user.routineData);
    setRenderRoutine(entireRoutine);
    setLoading(true);
  };

  useEffect(() => {
    loading === false ? firstAction() : console.log("전체 루틴 리스트 페이지");
  });

  // 리스트 내 각 운동의 유저 정보 받아오기
  const getUserProfile = (id) => {
    fetch(`https://forty-cooks-sin-121-146-124-174.loca.lt/api/users/${id}`, {
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

  const goDetail = (id) => {
    props.navigation.navigate("RoutineDetail", id);
  };

  // 서치 버튼 클릭 시
  const goSearch = () => {
    if (context === "") {
      setRenderRoutine(entireRoutine);
      return;
    }
    const thisContext = context.split(",");

    const tempList = [];
    // 루틴 loop
    entireRoutine.map((exercise) => {
      let isPush = false;

      // 운동 hashtag array loop
      exercise.hashtags.map((hashtag) => {
        if (isPush) return;

        // 검색어 array loop
        thisContext.map((item) => {
          if (isPush) return;

          if (hashtag.name === item) {
            tempList.push(exercise);
            isPush = true;
          }
        });
      });
    });

    setRenderRoutine(tempList);
    console.log("render: " + JSON.stringify(renderRoutine));
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
            <TextInput
              value={context}
              onChangeText={(text) => setContext(text)}
              autoCapitalize="sentences"
              autoCorrect
              placeholder="검색어를 입력하세요."
            />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    flex: 7.5,
    width: "90%",
    marginLeft: "5%",
  },
  body_topBox: {
    flex: 0.07,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  body_topBox_Text: {
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 4,
  },
  body_topBox_sort: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  body_topBox_sort_text: {
    fontSize: 16,
    marginRight: 5,
  },
  body_topBox_btn: {
    width: 8,
    height: 8,
  },
  body_toolBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingBottom: 3,
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  body_toolBox_left: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  body_toolBox_search: {
    width: 23,
    height: 23,
  },
  list_card: {
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  list_top: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  list_top_rank: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    marginLeft: 5,
    backgroundColor: "#242A3D",
  },
  list_top_rank_text: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "600",
    color: "white",
    marginBottom: -2,
  },
  list_top_rank_underLine: {
    width: "28%",
    height: 1,
    backgroundColor: "white",
  },
  list_top_rank_info: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 20,
  },
  list_top_rank_info_name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#242A3D",
  },
  list_top_rank_info_follow: {
    fontSize: 11,
    color: "#464B58",
  },
  list_bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  list_hashtags: {
    color: "#242A3D",
  },
  list_bottom_creator: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  list_bottom_creator_username: {
    fontSize: 14,
    fontWeight: "600",
    color: "#464B58",
  },
  list_bottom_creator_img: {
    width: 25,
    height: 25,
    marginLeft: 10,
    marginBottom: 3,
  },
  modal: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "30%",
  },
  modal_text: {
    marginTop: 10,
    fontSize: 20,
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
