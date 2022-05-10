import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { API_URL } from "@env";
import Loader from "../Components/Loader";
import TopBar from "../Components/TopBar";
import ExerciseCard from "../Components/ExerciseCard";
import Calander from "../Components/Calander";

// 루틴 정보 담는 api

const RoutineDetail = (props) => {
  const [loading, setLoading] = useState(true);
  const [thisRoutine, setThisRoutine] = useState({}); // 루틴 정보
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

  const routineId = props.route.params;

  // 루틴 받아오기
  const routineDetail = async () => {
    // 요일 별 부위
    try {
      const response = await fetch(
        `https://sour-papers-grab-121-146-124-174.loca.lt/api/routines/${routineId}/days`,
        {
          headers: {
            method: "GET",
          },
        }
      );
      const routineData = await response.json();
      putBodyParts(routineData);
    } catch (error) {
      console.log("error in routineDetail: " + error);
    }
  };

  // 요일 별 부위 삽입
  const putBodyParts = (routineData) => {
    routineData.map((routine) => {
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
        `${`https://sour-papers-grab-121-146-124-174.loca.lt`}/api/routines/${routineId}/exercises`,
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
    routineDetail();
    setClickedDay("mon");
    getEntireEx();
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
      <View key={key}>
        <ExerciseCard item={item} />
      </View>
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <TopBar navigation={props.navigation} />
      <View style={styles.body}>
        <View style={styles.userInfo}></View>
        <View style={styles.calander}>
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
    flex: 6,
    width: "90%",
    marginLeft: "5%",
  },
  calander: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(RoutineDetail);
