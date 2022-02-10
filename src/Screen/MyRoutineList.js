import React, { useEffect, useState } from "react";
import { View, Text} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import * as Progress from 'react-native-progress';
import Loader from "../Components/Loader";

const MyRoutineList = (props) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [r_routine, setR_routine] = useState(0);
  const [todayDone, setTodayDone] = useState(0);
  const [quota, setQuota] = useState(0);

  console.log("대표루틴: " + JSON.stringify(r_routine));

  // 대표 루틴 받아오기
  const myRepresentRoutine = () => {
    const myRoutineId = props.user.userData.represent_routine.routine;

    if(myRoutineId == null) {
      // null 처리필요
      myRoutineId = 1;
    } else {
      fetch(`https://popular-wasp-90.loca.lt/api/routines/${myRoutineId}/`, { 
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
