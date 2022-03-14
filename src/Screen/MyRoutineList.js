import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { API_URL } from "@env";
import * as Progress from "react-native-progress";
import Loader from "../Components/Loader";

const MyRoutineList = (props) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [todayDone, setTodayDone] = useState(0);
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
      fetch(
        `${`https://wet-emu-68.loca.lt`}/api/routines/${myRoutineId}/days`,
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
        `${`https://wet-emu-68.loca.lt`}/api/routines/${myRoutineId}/exercises`,
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

  const firstAction = () => {
    myRepresentRoutine();
    setDate(new Date());
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
      <View>
        <Text>{item}</Text>
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

  return loading ? (
    <View>
      <TouchableOpacity activeOpacity={0.5} onPress={goHome}>
        <Text>go home</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} onPress={goRoutineLIst}>
        <Text>+</Text>
      </TouchableOpacity>
      <Text>
        {date.getFullYear()}.{date.getMonth()}.{date.getDay()}
      </Text>
      <Text>완료 {todayDone} 루틴 3</Text>
      <View>
        <Text>월 {mon} </Text>
        <Text>화 {tue} </Text>
        <Text>수 {wed} </Text>
        <Text>목 {thu} </Text>
        <Text>금 {fri} </Text>
        <Text>토 {sat} </Text>
        <Text>일 {sun} </Text>
      </View>
      <View>
        <Progress.Bar progress={0.3} />
      </View>
      <View>{renderFeed()}</View>
    </View>
  ) : (
    Loader
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

export default connect(mapStateToProps, mapDispatchToProps)(MyRoutineList);
