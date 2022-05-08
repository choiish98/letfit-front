import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { API_URL } from "@env";
import * as Progress from "react-native-progress";
import Loader from "../Components/Loader";
import TopBar from "../Components/TopBar";
import ExerciseCard from "../Components/ExerciseCard";
import Calander from "../Components/Calander";

// 요일 별 부위 밑에 날짜 업데이트 필요

const MyRoutineList = (props) => {
  const [loading, setLoading] = useState(true);
  const [todayExercise, setTodayExercise] = useState([]); // 보여줄 운동 리스트
  const [clickedDay, setClickedDay] = useState(""); // 클릭 요일 저장
  const [entireExercise, setEntireExercise] = useState([]); // 전체 운동 저장
  const [mon, setMon] = useState(""); // 이번 주 운동 저장
  const [tue, setTue] = useState("");
  const [wed, setWed] = useState("");
  const [thu, setThu] = useState("");
  const [fri, setFri] = useState("");
  const [sat, setSat] = useState("");
  const [sun, setSun] = useState("");

  const d = new Date();
  const myRoutineId = props.user.userData.represent_routine.routine;

  // 대표 루틴 받아오기
  const myRepresentRoutine = async () => {
    if (myRoutineId == "") {
      props.navigate.goBack();
    } else {
      // 요일 별 부위 저장
      try {
        const response = await fetch(
          `https://forty-cooks-sin-121-146-124-174.loca.lt/api/routines/${myRoutineId}/days`,
          {
            headers: {
              method: "GET",
            },
          }
        );
        const r_routineData = await response.json();
        console.log("대표루틴(월): " + JSON.stringify(r_routineData[0]));
        putBodyParts(r_routineData);
      } catch (error) {
        console.log("error in get myR_Routine: " + error);
      }
    }
  };

  // 요일 별 부위 삽입
  const putBodyParts = (r_routine) => {
    console.log("r_routine: " + r_routine);
    r_routine.map((routine) => {
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
  };

  // 전체 운동 저장
  const getEntireEx = async () => {
    try {
      const response = await fetch(
        `${`https://forty-cooks-sin-121-146-124-174.loca.lt`}/api/routines/${myRoutineId}/exercises`,
        {
          headers: {
            method: "GET",
          },
        }
      );
      const thisEntireEx = await response.json();
      setEntireExercise(thisEntireEx[0].exercise);
    } catch (error) {
      console.log("error in getEntireEx: " + error);
    }
  };

  const firstAction = () => {
    console.log("로딩 중");
    myRepresentRoutine();
    setClickedDay("mon");
    getEntireEx();
    getDate();
    setLoading(false);
  };

  useEffect(() => {
    loading ? firstAction() : console.log("로딩 완료");
  });

  // 요일 별 부위 검사 후 부위에 맞는 운동 삽입
  const updateExercise = (today) => {
    const tempArray = []; // 운동 리스트 저장 배열
    const tempBody = today.split(","); // 오늘 운동 부위

    entireExercise.map((exercise) => {
      if (tempBody.includes(exercise.body_part)) {
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
  };

  // 요일 클릭할 때마다
  useEffect(() => {
    switch (clickedDay) {
      case "mon":
        updateExercise(mon);
        break;
      case "tue":
        updateExercise(tue);
        break;
      case "wed":
        updateExercise(wed);
        break;
      case "thu":
        updateExercise(thu);
        break;
      case "fri":
        updateExercise(fri);
        break;
      case "sat":
        updateExercise(sat);
        break;
      case "sun":
        updateExercise(sun);
        break;
    }
  }, [clickedDay]);

  const ItemView = (item, key) => {
    return (
      <TouchableOpacity
        key={key}
        onPress={() => {
          if (!item.done) {
            props.navigation.replace("Exercise", { item });
          }
        }}
      >
        <ExerciseCard item={item} />
      </TouchableOpacity>
    );
  };

  // 날짜 렌더링
  const updateDate = () => {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const thisDate = d.getDate();

    return (
      <Text style={styles.statusFont}>
        {year}.{month}.{thisDate}
      </Text>
    );
  };

  // progress bar 게이지 계산
  const goalProgress = () => {
    return (
      props.user.userData.exercise_success_number /
      props.user.userData.exercise_goal_number
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <TopBar navigation={props.navigation} />
      <View style={styles.body}>
        <View
          style={[styles.flexRow, styles.contentSpaceBetween, styles.status]}
        >
          {updateDate()}
          <Text style={styles.statusFont}>
            완료 {props.user.userData.exercise_success_number} 루틴{" "}
            {props.user.userData.exercise_goal_number}
          </Text>
        </View>
        <View
          style={[styles.flexRow, styles.contentSpaceBetween, styles.calander]}
        >
          <TouchableOpacity
            onPress={() => {
              setClickedDay("mon");
            }}
          >
            <Calander
              bodyParts={mon}
              dayNum={0}
              isClicked={clickedDay === "mon"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setClickedDay("tue");
            }}
          >
            <Calander
              bodyParts={tue}
              dayNum={1}
              isClicked={clickedDay === "tue"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setClickedDay("wed");
            }}
          >
            <Calander
              bodyParts={wed}
              dayNum={2}
              isClicked={clickedDay === "wed"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setClickedDay("thu");
            }}
          >
            <Calander
              bodyParts={thu}
              dayNum={3}
              isClicked={clickedDay === "thu"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setClickedDay("fri");
            }}
          >
            <Calander
              bodyParts={fri}
              dayNum={4}
              isClicked={clickedDay === "fri"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setClickedDay("sat");
            }}
          >
            <Calander
              bodyParts={sat}
              dayNum={5}
              isClicked={clickedDay === "sat"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setClickedDay("sun");
            }}
          >
            <Calander
              bodyParts={sun}
              dayNum={6}
              isClicked={clickedDay === "sun"}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.contentCenter, styles.progress]}>
          <Progress.Bar
            progress={goalProgress()}
            color="#2A3042"
            unfilledColor="#DEDEDE"
            borderColor="#DEDEDE"
            borderRadius={0}
            width={330}
            height={15}
          />

          <View
            style={[
              styles.flexRow,
              styles.contentSpaceBetween,
              styles.progress_status,
            ]}
          >
            <Text progress_status_center_value>오늘</Text>

            <View style={[styles.progress_status_middle, styles.contentCenter]}>
              <View style={styles.flexRow}>
                <Text style={styles.progress_status_center_text}>성공 </Text>
                <Text style={styles.progress_status_center_text}>목표</Text>
              </View>
              <View style={[styles.flexRow, styles.progress_status_center]}>
                <Text style={styles.progress_status_center_value}>
                  {props.user.userData.exercise_success_number}
                </Text>
                <Text style={styles.progress_status_center_value}> / </Text>
                <Text style={styles.progress_status_center_value}>
                  {props.user.userData.exercise_goal_number}
                </Text>
              </View>
            </View>

            <View></View>
          </View>
        </View>
        <ScrollView style={styles.doinList}>
          {todayExercise.map(ItemView)}
        </ScrollView>
      </View>
    </View>
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
  status: {
    alignItems: "center",
    padding: 10,
  },
  statusFont: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: "600",
    color: "#242A3D",
  },
  calander: {
    alignItems: "center",
    width: "90%",
    marginLeft: "5%",
  },
  progress: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  progress_status: {
    alignItems: "flex-end",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#2A3042",
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
  flexRow: {
    flexDirection: "row",
  },
  contentCenter: {
    justifyContent: "center",
  },
  contentSpaceBetween: {
    justifyContent: "space-between",
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
