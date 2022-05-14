import React, { useState } from "react";
import { View, Text, Image, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { styles } from "../Styles/search";
import { routineActionCreators } from "../Actions/routineIndex";
import TopBar from "../Components/TopBar";
import RoutineCard from "../Components/RoutineCard";
import CustomModal from "../Components/CustomModal";

const RoutineList = (props) => {
  const entireRoutine = props.routine;
  const [isModalVisible, setModalVisible] = useState(false);
  const [renderRoutine, setRenderRoutine] = useState(entireRoutine); // 렌더링 운동 저장
  const [context, setContext] = useState(""); // 검색어

  // 서치 버튼 클릭 시
  const goSearch = () => {
    // 검색어 없을 때
    if (context === "") {
      setRenderRoutine(entireRoutine);
      return;
    }

    const thisContext = context.split(","); // 검색어 콤마 배열
    const tempList = []; // 검색어 포함한 루틴 담는 배열
    // 루틴 loop
    entireRoutine.map((exercise) => {
      let isPush = false; // 들어간 운동 체크

      // 운동 hashtag array loop
      exercise.hashtags.map((hashtag) => {
        if (isPush) return;

        // 검색어 array loop
        thisContext.map((item) => {
          if (isPush) return;

          if (hashtag.name.includes(item)) {
            tempList.push(exercise);
            isPush = true;
          }
        });
      });
    });

    setRenderRoutine(tempList);
  };

  // routine render
  const itemView = (item, key) => {
    return (
      <TouchableOpacity
        key={key}
        onPress={() => props.navigation.navigate("RoutineDetail", item.id)}
        style={styles.list_card}
      >
        <RoutineCard item={item} thisKey={key} />
      </TouchableOpacity>
    );
  };

  // 모달 on/off
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
              source={require("../../assets/Icon/sort_bnt.png")}
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
              source={require("../../assets/Icon/serach_bnt.png")}
              style={styles.body_toolBox_search}
            />
          </TouchableOpacity>
        </View>
        <CustomModal
          isModalVisible={isModalVisible}
          renderRoutine={renderRoutine}
          setRenderRoutine={setRenderRoutine}
          toggleModal={toggleModal}
        />
        <View>{renderRoutine.map(itemView)}</View>
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return { user: state, routine: state.routineData };
}

function mapDispatchToProps(dispatch) {
  return {
    defineUser: (user) => dispatch(actionCreators.defineUser(user)),
    deleteUser: () => dispatch(actionCreators.deleteUser()),
    defineRoutine: (routine) =>
      dispatch(routineActionCreators.defineRoutine(routine)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineList);
