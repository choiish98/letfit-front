import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../Actions/userIndex";
import { routineActionCreators } from "../Actions/routineIndex";
import Loader from "../Components/Loader";

// 운동 info api
// break mode에서 reps를 break time 이미지로 변환 필요

const Exercise = (props) => {
  const [loading, setLoading] = useState(false);

  console.log("props: " + JSON.stringify(props.route.params));
  const timerSets = props.route.params.timerSets;
  const set = props.route.params.set;
  const totalTime = props.route.params.totalTime;
  const runningTime = props.route.params.runningTime;
  const restTime = props.route.params.restTime;

  const firstAction = () => {
    setLoading(true);
  };

  // loading
  useEffect(() => {
    loading === false ? firstAction() : console.log("운동 화면");
  });

  // [부위] 운동명 <= 렌더링 함수, 배열을 <Text> [부위] </Text> <Text> 운동명 </Text>로
  const renderingTitle = () => {
    const title = [];
    props.route.params.item.split("] ").map((item) => {
      if (item.includes("[")) {
        title.push(
          <Text key={"parts"} style={styles.title_parts}>
            {item.toString() + "]"}
          </Text>
        );
      } else {
        title.push(
          <Text key={"exercise"} style={styles.title_exercise}>
            {item.toString()}
          </Text>
        );
      }
    });

    return <View style={styles.title}>{title}</View>;
  };

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
        <View style={styles.body_topBox}>{renderingTitle()}</View>
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
                source={require("../Image/total_time_icon.png")}
                style={styles.body_setBox_img}
              />
            </View>
            <Text style={styles.body_setBox_small_text}>전체 운동 시간</Text>
          </View>
          <Text style={styles.body_report_text}>{secToMin(totalTime)}</Text>
        </View>
        <View style={styles.body_setBox}>
          <View style={styles.body_setBox_small}>
            <View style={styles.body_setBox_imgBox}>
              <Image
                source={require("../Image/avg_time_icon.png")}
                style={styles.body_setBox_img}
              />
            </View>
            <Text style={styles.body_setBox_small_text}>
              세트 당 평균 소요 시간
            </Text>
          </View>
          <Text style={styles.body_report_text}>{secToMin(runningTime)}</Text>
        </View>
        <View style={styles.body_setBox}>
          <View style={styles.body_setBox_small}>
            <View style={styles.body_setBox_imgBox}>
              <Image
                source={require("../Image/rest_time_icon.png")}
                style={styles.body_setBox_img}
              />
            </View>
            <Text style={styles.body_setBox_small_text}>
              세트 당 평균 휴식 시간
            </Text>
          </View>
          <Text style={styles.body_report_text}>{secToMin(restTime)}</Text>
        </View>
        <View style={styles.confirm}>
          <TouchableOpacity activeOpacity={0.5} onPress={confirm}>
            <Image
              source={require("../Image/work_complete(bigger).png")}
              style={styles.body_complete}
            />
          </TouchableOpacity>
        </View>
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
  topbar: {
    flex: 0.8,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#2A3042",
    paddingBottom: 15,
  },
  topbar_text: {
    width: "33%",
    textAlign: "center",
    fontSize: 25,
    color: "#2A3042",
    fontWeight: "600",
    color: "white",
  },
  body: {
    flex: 7,
    width: "90%",
    marginLeft: "5%",
  },
  title: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: "33%",
    marginTop: 20,
    marginLeft: "33%",
    marginBottom: "5%",
  },
  title_parts: {
    fontSize: 18,
    color: "#7F7F80",
  },
  title_exercise: {
    fontSize: 23,
    fontWeight: "600",
    color: "#242A3D",
  },
  body_info: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#464B58",
  },
  body_info_today: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7F7F80",
    fontStyle: "italic",
    marginBottom: 15,
  },
  body_info_goalBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  body_info_goalBox_text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7F7F80",
    marginBottom: 3,
  },
  body_info_goalBox_timerSets: {
    fontSize: 48,
    fontWeight: "600",
    color: "#D63417",
  },
  body_info_goalBox_set: {
    fontSize: 48,
    fontWeight: "600",
  },
  body_info_goalBox_slash: {
    fontSize: 48,
    fontWeight: "600",
    marginLeft: 10,
    marginRight: 10,
  },
  body_setBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#DEDEDF",
  },
  body_setBox_small: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body_setBox_text: {
    fontSize: 28,
    fontWeight: "600",
    color: "#7F7F80",
  },
  body_setBox_data: {
    fontSize: 28,
    fontWeight: "600",
    color: "#D63417",
    marginLeft: 20,
    marginRight: 5,
  },
  body_report_text: {
    fontSize: 28,
    fontWeight: "600",
  },
  body_setBox_small_text: {
    fontSize: 15,
    fontWeight: "600",
    color: "#7F7F80",
  },
  body_setBox_imgBox: {
    width: 20,
    height: 25,
    marginLeft: 20,
    marginRight: 10,
  },
  body_setBox_img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  body_complete: {
    width: 100,
    height: 100,
  },
  confirm: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
  },
});

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
