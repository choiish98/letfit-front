import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../Actions/userIndex";
import { routineActionCreators } from "../Actions/routineIndex";
import { styles } from "../Styles/exerciseDone";
import Loader from "../Components/Loader";

// 운동 완료 api

const Exercise = (props) => {
  const [loading, setLoading] = useState(false);

  console.log("props: " + JSON.stringify(props.route.params));
  const timerSets = props.route.params.timerSets;
  const set = props.route.params.set;
  const totalTime = props.route.params.totalTime;
  const userRunningTime = props.route.params.userRunningTime;
  const userRestTime = props.route.params.userRestTime;
  const item = props.route.params.item;

  const firstAction = () => {
    setLoading(true);
  };

  // loading
  useEffect(() => {
    loading === false ? firstAction() : console.log("운동 화면");
  });

  // 초를 분 단위로
  const secToMin = (sec) => {
    let parseSec = parseInt(sec % 60);
    parseSec = parseSec < 10 ? "0" + parseSec : parseSec;
    return parseInt(sec / 60) + ":" + parseSec;
  };

  // My Routine List 화면으로 전환
  const confirm = () => {
    // 완료 기능 필요
    props.navigation.replace("MyRoutineList");
  };

  return loading ? (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.topbar_text}>LETFIT</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.title}>
          <Text style={styles.title_parts}>{item.body_part}</Text>
          <Text style={styles.title_exercise}>{item.name}</Text>
        </View>
        <View style={styles.body_info}>
          <Text style={styles.body_info_today}>TODAY</Text>
          <View style={styles.body_info_goalBox}>
            <View>
              <Text style={styles.body_info_goalBox_text}>성공</Text>
              <Text style={styles.body_info_goalBox_timerSets}>
                {timerSets}
              </Text>
            </View>
            <Text style={styles.body_info_goalBox_slash}>/</Text>
            <View>
              <Text style={styles.body_info_goalBox_text}>목표</Text>
              <Text style={styles.body_info_goalBox_set}>{set}</Text>
            </View>
          </View>
        </View>
        <View style={styles.body_setBox}>
          <View style={styles.body_setBox_small}>
            <Text style={styles.body_setBox_text}>SET</Text>
            <Text style={styles.body_setBox_data}>{timerSets}</Text>
          </View>
          <View style={styles.body_setBox_small}>
            <Text style={styles.body_setBox_text}>TOTAL</Text>
            <Text style={styles.body_setBox_data}>{totalTime}</Text>
          </View>
        </View>
        <View style={styles.body_setBox}>
          <View style={styles.body_setBox_small}>
            <View style={styles.body_setBox_imgBox}>
              <Image
                source={require("../../assets/Icon/total_time_icon.png")}
                style={styles.body_setBox_img}
              />
            </View>
            <Text style={styles.body_setBox_small_text}>전체 운동 시간</Text>
          </View>
          <Text style={styles.body_report_text}>
            {secToMin(userRunningTime + userRestTime)}
          </Text>
        </View>
        <View style={styles.body_setBox}>
          <View style={styles.body_setBox_small}>
            <View style={styles.body_setBox_imgBox}>
              <Image
                source={require("../../assets/Icon/avg_time_icon.png")}
                style={styles.body_setBox_img}
              />
            </View>
            <Text style={styles.body_setBox_small_text}>
              세트 당 평균 소요 시간
            </Text>
          </View>
          <Text style={styles.body_report_text}>
            {secToMin(userRunningTime / timerSets)}
          </Text>
        </View>
        <View style={styles.body_setBox}>
          <View style={styles.body_setBox_small}>
            <View style={styles.body_setBox_imgBox}>
              <Image
                source={require("../../assets/Icon/rest_time_icon.png")}
                style={styles.body_setBox_img}
              />
            </View>
            <Text style={styles.body_setBox_small_text}>
              세트 당 평균 휴식 시간
            </Text>
          </View>
          <Text style={styles.body_report_text}>
            {secToMin(userRestTime / (timerSets - 1))}
          </Text>
        </View>
        <View style={styles.body_confirm}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={confirm}
            style={styles.body_confirm_box}
          >
            <Image
              source={require("../../assets/Icon/work_complete(bigger).png")}
              style={styles.body_setBox_img}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : (
    Loader
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);
