import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { styles } from "../Styles/routineList";
import TopBar from "../Components/TopBar";
import RoutineCard from "../Components/RoutineCard";
import CustomModal from "../Components/CustomModal";
import Loader from "../Components/Loader";

const RoutineList = (props) => {
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [renderRoutine, setRenderRoutine] = useState([]);

  const getRoutineData = async () => {
    try {
      const response = await fetch(
        `https://shiny-turtles-jump-121-146-124-174.loca.lt/api/routines/`,
        {
          method: "GET",
        }
      );
      const routineData = await response.json();

      setRenderRoutine(routineData);
    } catch (error) {
      console.log("error in getRoutinData: " + error);
    }
  };

  const firstAction = async () => {
    console.log("로딩 중");
    await getRoutineData();
    await setLoading(false);
  };

  useEffect(() => {
    loading ? firstAction() : console.log("로딩 완료");
  });

  const goSearch = () => {
    props.navigation.navigate("Search", {
      routineData: props.user.routineData,
    });
  };

  const goMakeRoutine = () => {
    props.navigation.navigate("MakeRoutine");
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

  return loading ? (
    <Loader />
  ) : (
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
            <TouchableOpacity activeOpacity={0.5} onPress={goMakeRoutine}>
              <Image
                source={require("../../assets/Icon/routine_add_bnt.png")}
                style={styles.body_toolBox_add}
              />
            </TouchableOpacity>
            <Text>내 루틴 만들기</Text>
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
          toggleModal={toggleModal}
          renderRoutine={renderRoutine}
        />
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
