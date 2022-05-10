import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import Modal from "react-native-modal";
import { API_URL } from "@env";
import { styles } from "../Styles/routineList";
import TopBar from "../Components/TopBar";
import Loader from "../Components/Loader";
import RoutineCard from "../Components/RoutineCard";

// 순위 1, 2, 3 기능

const RoutineList = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [renderRoutine, setRenderRoutine] = useState([]); // 전체 운동 저장

  useEffect(() => {
    setRenderRoutine(props.user.routineData);
  });

  const goSearch = () => {
    props.navigation.navigate("Search", {
      routineData: props.user.routineData,
    });
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

  // routine render
  const itemView = (item, key) => {
    return (
      <TouchableOpacity
        key={key}
        onPress={() => props.navigation.navigate("RoutineDetail", item.id)}
        style={styles.list_card}
      >
        <RoutineCard item={item} />
      </TouchableOpacity>
    );
  };

  return (
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
        <View>{renderRoutine.map(itemView)}</View>
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
    deleteUser: () => dispatch(actionCreators.deleteUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineList);
