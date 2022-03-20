import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { API_URL } from "@env";
import * as Progress from "react-native-progress";
import Loader from "../Components/Loader";
import { stringify } from "flatted";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const MyRoutineList = (props) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [todayExercise, setTodayExercise] = useState([]);
  const [mon, setMon] = useState("");
  const [tue, setTue] = useState("");
  const [wed, setWed] = useState("");
  const [thu, setThu] = useState("");
  const [fri, setFri] = useState("");
  const [sat, setSat] = useState("");
  const [sun, setSun] = useState("");

  // 대표 루틴 받아오기
  const myRepresentRoutine = () => {
    const myRoutineId = props.user.userData.represent_routine.routine;

    if (myRoutineId == null) {
      // null 처리필요
      console.log("대표루틴이 존재하지 x");
      goHome();
      myRoutineId = 1;
    } else {
      fetch(`https://polite-cow-75.loca.lt/api/routines/${myRoutineId}/days`, {
        headers: {
          method: "GET",
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // 대표 루틴 저장
          console.log("대표루틴: " + JSON.stringify(responseJson[0]));

          //요일 별 부위 삽입
          responseJson.map((routine) => {
            switch (routine.day) {
              case "월":
                setMon(mon + routine.body_part);
                break;
              case "화":
                setTue(tue + routine.body_part);
                break;
              case "수":
                setWed(wed + routine.body_part);
                break;
              case "목":
                setThu(thu + routine.body_part);
                break;
              case "금":
                setFri(fri + routine.body_part);
                break;
              case "토":
                setSat(sat + routine.body_part);
                break;
              case "일":
                setSun(sun + routine.body_part);
                break;
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });

      fetch(
        `${`https://polite-cow-75.loca.lt`}/api/routines/${myRoutineId}/exercises`,
        {
          headers: {
            method: "GET",
          },
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          // 오늘 운동 불러오기
          const tempArray = [];

          responseJson[0].exercise.filter((exercise) => {
            if (exercise.body_part === "어깨") {
              const thisExercise =
                "[" + exercise.body_part + "] " + exercise.name;
              tempArray.push(thisExercise);
            }
          });
          console.log("TempArray: " + tempArray);
          setTodayExercise(tempArray);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getDate = () => {
    const date = new Date();
    setDate(date);
  };

  const firstAction = () => {
    myRepresentRoutine();
    getDate();
    setLoading(true);
  };

  useEffect(() => {
    loading === false ? firstAction() : console.log("asdf");
  });

  const goHome = () => {
    props.navigation.replace("Home");
  };

  const goRoutineLIst = () => {
    props.navigation.replace("RoutineList");
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.todayExerciseCard}>
        <Text style={styles.todayExerciseCard_text}>{item}</Text>
      </View>
    );
  };

  const renderFeed = () => {
    return (
      <FlatList
        data={todayExercise}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    );
  };

  // 부위 배열을 text로 하나씩 리턴
  const arrToText = (item) => {
    let result = [];

    item.split(",").map((thisItem) => {
      if (thisItem === "") {
        result.push(<Text style={styles.calader_day_reText}>휴식</Text>);
      } else {
        result.push(<Text style={styles.calader_day_exText}>{thisItem}</Text>);
      }
    });

    return <View>{result}</View>;
  };

  // progress bar 게이지 계산
  const goalProgress = () => {
    return (
      props.user.userData.exercise_success_number /
      props.user.userData.exercise_goal_number
    );
  };

  return loading ? (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.topbar_text}>LETFIT</Text>
      </View>
      <View style={styles.status}>
        <Text>
          {date.getFullYear()}.{date.getMonth()}.{date.getDay()}
        </Text>
        <Text>
          완료 {props.user.userData.exercise_success_number} 루틴{" "}
          {props.user.userData.exercise_goal_number}
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.calander}>
          <View style={styles.calader_day}>
            <Text>{arrToText(mon)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>월</Text>
          </View>
          <View style={styles.calader_day}>
            <Text>{arrToText(tue)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>화</Text>
          </View>
          <View style={styles.calader_day}>
            <Text>{arrToText(wed)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>수</Text>
          </View>
          <View style={styles.calader_day}>
            <Text>{arrToText(thu)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>목</Text>
          </View>
          <View style={styles.calader_day}>
            <Text>{arrToText(fri)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>금</Text>
          </View>
          <View style={styles.calader_day}>
            <Text>{arrToText(sat)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>토</Text>
          </View>
          <View style={styles.calader_day}>
            <Text>{arrToText(sun)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>일</Text>
          </View>
        </View>

        <View style={styles.progress}>
          <Progress.Bar
            progress={goalProgress()}
            color="#2A3042"
            unfilledColor="#DEDEDE"
            borderColor="#DEDEDE"
            borderRadius="0"
            width={340}
            height={15}
          />

          <View style={styles.progress_status}>
            <Text progress_status_center_value>오늘</Text>

            <View style={styles.progress_status_middle}>
              <View style={styles.progress_status_center}>
                <Text style={styles.progress_status_center_text}>성공 </Text>
                <Text style={styles.progress_status_center_text}>목표</Text>
              </View>
              <View style={styles.progress_status_center}>
                <Text style={styles.progress_status_center_value}>
                  {props.user.userData.exercise_success_number}
                </Text>
                <Text style={styles.progress_status_center_value}> / </Text>
                <Text style={styles.progress_status_center_value}>
                  {props.user.userData.exercise_goal_number}
                </Text>
              </View>
            </View>

            <TouchableOpacity activeOpacity={0.5} onPress={goRoutineLIst}>
              <Image
                source={require("../Image/setting.png")}
                style={styles.settingIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.doinList}>{renderFeed()}</View>
      </View>
      <TouchableOpacity activeOpacity={0.5} onPress={goHome}>
        <Text>go home</Text>
      </TouchableOpacity>
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
  topbar_text: {
    fontSize: 25,
    color: "#2A3042",
    fontWeight: "600",
    paddingBottom: 15,
    color: "white",
  },
  status: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  body: {
    flex: 6,
  },
  calander: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  calader_day: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: 50,
    height: 100,
    padding: 3,
    paddingBottom: 10,
  },
  calader_day_bar: {
    justifyContent: "center",
    width: 30,
    backgroundColor: "#DEDEDE",
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  calader_day_exText: {
    color: "#2A3042",
    fontWeight: "600",
  },
  calader_day_reText: {
    color: "#DEDEDE",
  },
  progress: {
    margin: 20,
  },
  progress_status: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#2A3042",
  },
  progress_status_middle: {
    justifyContent: "center",
  },
  progress_status_center: {
    flexDirection: "row",
    justifyContent: "center",
  },
  progress_status_center_text: {
    fontSize: 10,
    color: "#DEDEDE",
  },
  progress_status_center_value: {
    fontSize: 15,
    color: "black",
    fontWeight: "600",
    marginTop: 3,
  },
  settingIcon: {
    width: 25,
    height: 25,
  },
  todayExerciseCard: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    backgroundColor: "#DEDEDE",
    color: "#2A3042",
    margin: 10,
  },
  todayExerciseCard_text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2A3042",
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

export default connect(mapStateToProps, mapDispatchToProps)(MyRoutineList);
