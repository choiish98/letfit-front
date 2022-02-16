import React, { useEffect, useState } from "react";
import { View, Text} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import {API_URL} from "@env";
import * as Progress from 'react-native-progress';
import Loader from "../Components/Loader";

const MyRoutineList = (props) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [r_routine, setR_routine] = useState(0);
  const [todayDone, setTodayDone] = useState(0);
  const [quota, setQuota] = useState(0);
  const [mon, setMon] = useState("");
  const [tue, setTue] = useState("");
  const [wed, setWed] = useState("");
  const [thu, setThu] = useState("");
  const [fri, setFri] = useState("");
  const [sat, setSat] = useState("");
  const [sun, setSun] = useState("");

  console.log("대표루틴: " + JSON.stringify(r_routine));

  // 대표 루틴 받아오기
  const myRepresentRoutine = () => {
    const myRoutineId = props.user.userData.represent_routine.routine;

    if(myRoutineId == null) {
      // null 처리필요
      myRoutineId = 1;
    } else {
      fetch(`${API_URL}/api/routines/${myRoutineId}/`, { 
        headers: {
            "method": "GET",
          },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            // 대표 루틴 저장
            setR_routine(responseJson);
            setLoading(true);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    // 요일 별 부위 삽입
    // r_routine.map(routine => {
    //   const day = routine.day;
    //   switch (day) {
    //     case "월":
    //       setMon(mon + routine.exercise.body_part);
    //       break;
    //     case "화":
    //       setTue(tue + routine.exercise.body_part);
    //       break;
    //     case "수":
    //       setWed(wed + routine.exercise.body_part);
    //       break;
    //     case "목":
    //       setThu(thu + routine.exercise.body_part);
    //       break;
    //     case "금":
    //       setFri(fri + routine.exercise.body_part);
    //       break;
    //     case "토":
    //       setSat(sat + routine.exercise.body_part);
    //       break;
    //     case "일":
    //       setSun(sun + routine.exercise.body_part);
    //       break;
    //   }
    // });
  }
    
  const firstAction = () => {
    myRepresentRoutine();
    console.log("date" + date);
  }

  useEffect(() => {
    loading === false
      ? firstAction()
      : console.log("asdf");
  });

  const goHome = () => {
    props.navigation.replace("Home");
  };

  return loading ? (
    <View>
        <TouchableOpacity activeOpacity={0.5} onPress={goHome} />
          <Text>{date.getFullYear()}.{date.getMonth()}.{date.getDay()}</Text>
          <Text>완료 {todayDone} 루틴 {r_routine.length}</Text>
          <View>
            <Text>월</Text>
            <Text>화</Text>
            <Text>수</Text>
            <Text>목</Text>
            <Text>금</Text>
            <Text>토</Text>
            <Text>일</Text>
          </View>
          <View>
            <Progress.Bar progress={0.3}/>
          </View>
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
