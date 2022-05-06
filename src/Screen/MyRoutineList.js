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
import TopBar from "../Components/TopBar";

// 요일 별 부위 밑에 날짜 업데이트 필요
// 날짜로 요일 찾아서 오늘 운동 업데이트 필요

const MyRoutineList = (props) => {
  const [loading, setLoading] = useState(false);
  const [todayExercise, setTodayExercise] = useState([]);
  const [d, setD] = useState(0);

  // 이번 주 운동 저장
  const [mon, setMon] = useState("");
  const [tue, setTue] = useState("");
  const [wed, setWed] = useState("");
  const [thu, setThu] = useState("");
  const [fri, setFri] = useState("");
  const [sat, setSat] = useState("");
  const [sun, setSun] = useState("");

  // 요일 별 날짜 저장
  let date = [1, 2, 3, 4, 5, 6, 7];

  // dummy
  const dummy = [
    {
      id: 1,
      name: "사레레",
      body_part: "어깨",
      set: 2,
      runningTime: 6,
      restTime: 6,
      reps: 2,
      done: false,
    },
    {
      id: 2,
      name: "프레",
      body_part: "어깨",
      set: 2,
      runningTime: 6,
      restTime: 6,
      reps: 2,
      done: true,
    },
    {
      id: 3,
      name: "밀프",
      body_part: "어깨",
      set: 2,
      runningTime: 6,
      restTime: 6,
      reps: 2,
      done: true,
    },
  ];

  // 날짜 가져오기, 요일 별 날짜 업데이트
  const getDate = () => {
    const thisDate = new Date();
    setD(thisDate);

    // 요일별 날짜 업데이트
    let thisDay = thisDate.getDate(); // 날짜
    let tempDay = thisDate.getDay(); // 요일
    if (tempDay === 0) tempDay = tempDay + 7;

    for (let i = 0; i < date.length; i++) {
      if (date[i] < tempDay) {
        date[i] = thisDay - (tempDay - date[i]);
        console.log("과거: " + date[i]);
      } else if (date[i] > tempDay) {
        date[i] = thisDay + (tempDay - date[i]);
      } else {
        date[i] = thisDay;
      }
    }
  };

  const firstAction = () => {
    myRepresentRoutine();
    getDate();
    setLoading(true);
  };

  useEffect(() => {
    loading === false ? firstAction() : console.log("asdf");
  });

  // 대표 루틴 받아오기
  const myRepresentRoutine = () => {
    const myRoutineId = props.user.userData.represent_routine.routine;
    if (myRoutineId == null) {
      // null 처리필요
      console.log("대표루틴이 존재하지 x");
      goHome();
      myRoutineId = 1;
    } else {
      // 요일 별 부위 저장
      fetch(
        `https://silver-spoons-punch-121-146-124-174.loca.lt/api/routines/${myRoutineId}/days`,
        {
          headers: {
            method: "GET",
          },
        }
      )
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
        `${`https://silver-spoons-punch-121-146-124-174.loca.lt`}/api/routines/${myRoutineId}/exercises`,
        {
          headers: {
            method: "GET",
          },
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("responseJson: " + JSON.stringify(responseJson));

          // 오늘 운동 불러오기
          const tempArray = [];

          // responseJson[0].exercise.filter((exercise) => {
          //   // 어깨로 해놨는데 오늘 운동 부위로 바꿔줘야 함, today_bodypart.include(exercise.body_part)
          //   // 요일을 찾아서 today_body_part가 뭔지 찾아야 함
          //   // 운동 자료구조를 이름만 넣는게 아니라 성공 횟수 목표 횟수 운동 시간을 넣는 걸로 업데이트 필요
          //   if (exercise.body_part === "어깨") {
          //     const thisExercise =
          //       "[" + exercise.body_part + "] " + exercise.name;
          //     tempArray.push(thisExercise);
          //   }
          // });

          dummy.map((exercise) => {
            if (exercise.body_part === "어깨") {
              const thisExercise = {};
              thisExercise.key = exercise.key;
              thisExercise.body_part = "[" + exercise.body_part + "]";
              thisExercise.name = exercise.name;
              thisExercise.set = exercise.set;
              thisExercise.runningTime = exercise.runningTime;
              thisExercise.restTime = exercise.restTime;
              thisExercise.reps = exercise.reps;
              thisExercise.done = exercise.done;
              tempArray.push(thisExercise);
            }
          });
          setTodayExercise(tempArray);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const goRoutineLIst = () => {
    props.navigation.navigate("RoutineList");
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          if (!item.done) {
            props.navigation.replace("Exercise", { item });
          }
        }}
      >
        <View style={styles.todayExerciseCard}>
          <Text style={styles.todayExerciseCard_text_grey}>
            {item.body_part}
          </Text>
          <Text style={styles.todayExerciseCard_text}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFeed = () => {
    return (
      <FlatList
        data={todayExercise}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  };

  // 날짜 렌더링
  const updateDate = () => {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();

    return (
      <Text>
        {year}.{month}.{date}
      </Text>
    );
  };

  // 요일 별 날짜 렌더링
  const updateDay = (thisDay) => {
    return date[thisDay];
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

  // 달력 반복문
  const calanderRoop = () => {};

  return loading ? (
    <View style={styles.container}>
      <TopBar navigation={props.navigation} />
      <View style={styles.body}>
        <View style={styles.status}>
          {updateDate()}
          <Text>
            완료 {props.user.userData.exercise_success_number} 루틴{" "}
            {props.user.userData.exercise_goal_number}
          </Text>
        </View>
        <View style={styles.calander}>
          <View style={styles.calader_day}>
            <Text>{arrToText(mon)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>월</Text>
            <Text>{updateDay(0)}</Text>
          </View>
          <View style={styles.calader_day}>
            <Text>{arrToText(tue)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>화</Text>
            <Text>{date[1]}</Text>
          </View>
          <View style={styles.calader_day}>
            <Text>{arrToText(wed)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>수</Text>
            <Text>{date[2]}</Text>
          </View>
          <View style={styles.calader_day}>
            <Text>{arrToText(thu)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>목</Text>
            <Text>{date[3]}</Text>
          </View>
          <View style={styles.calader_day}>
            <Text>{arrToText(fri)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>금</Text>
            <Text>{date[4]}</Text>
          </View>
          <View style={styles.calader_day}>
            <Text>{arrToText(sat)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>토</Text>
            <Text>{date[5]}</Text>
          </View>
          <View style={styles.calader_day}>
            <Text>{arrToText(sun)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>일</Text>
            <Text>{date[6]}</Text>
          </View>
        </View>
        <View style={styles.progress}>
          <Progress.Bar
            progress={goalProgress()}
            color="#2A3042"
            unfilledColor="#DEDEDE"
            borderColor="#DEDEDE"
            borderRadius="0"
            width={330}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    backgroundColor: "#2A3042",
    paddingBottom: 15,
  },
  topbar_box: {
    paddingLeft: 10,
    width: 33,
  },
  topbar_back_img: {
    width: 13,
    height: 23,
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
    flex: 6,
    width: "90%",
    marginLeft: "5%",
  },
  status: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  calander: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    backgroundColor: "#DEDEDE",
    color: "#2A3042",
    margin: 10,
  },
  todayExerciseCard_text_grey: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: "600",
    color: "#7F7F80",
  },
  todayExerciseCard_text: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: "600",
    color: "#242A3D",
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
