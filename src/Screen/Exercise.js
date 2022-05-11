import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../Actions/userIndex";
import { routineActionCreators } from "../Actions/routineIndex";
import { styles } from "../Styles/exercise";
import Loader from "../Components/Loader";
import * as Progress from "react-native-progress";

// 운동 info api
// break mode에서 reps를 break time 이미지로 변환 필요

const Exercise = (props) => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({});
  const [rep, setRep] = useState(2);
  const [set, setSet] = useState(2);
  const [runningTime, setRunningTime] = useState(5);
  const [restTime, setRestTime] = useState(5);
  const [totalTime, setTotalTime] = useState(set * (runningTime + restTime));
  const [isTimerRunning, setisTimerRunning] = useState(false); // 일시 정지
  const [isBreak, setIsBreak] = useState(false); // 쉬는 시간

  // timer에 쓰이는 변수들
  const [timerRep, setTimerRep] = useState(rep); // 남은 렙스
  const [timerSets, setTimerSets] = useState(0); // 현재 진행한 세트 수
  const [timerRunningTime, setTimerRunningTime] = useState(runningTime); // 남은 이번 세트 운동 시간
  const [timerTotal, setTimerTotal] = useState(0); // 총 운동 시간, 초마다 1씩 깍임
  const [intervalId, setIntervalId] = useState(0); // timer 저장

  const firstAction = () => {
    setItem(props.route.params.item);
    setLoading(true);
  };

  // loading
  useEffect(() => {
    loading === false ? firstAction() : console.log("운동 화면");
  });

  // 완료 확인
  useEffect(() => {
    if (timerSets === set) {
      props.navigation.replace("Exercise_done", {
        timerSets,
        set,
        totalTime,
        userRunningTime: { runningTime },
        userRestTime: { restTime },
        item,
      });
    }
  }, [timerSets]);

  // 타이머 시작 종료마다 남은 시간을 검사 하여 브레이크 모드 전환
  useEffect(() => {
    // 운동 중이지 않고, 남은 시간이 0 이하, 브레이크 타임이 아닐 때 => 브레이크 타임으로 전환
    // 시간은 rest time으로 맞추기, rep text 없애고 break time 이미지로
    if (!isTimerRunning && timerRep <= 0 && !isBreak) {
      setIsBreak(true);
      setTimerRep(rep);
      setTimerRunningTime(restTime);
    } else if (!isTimerRunning && timerRunningTime <= 0 && isBreak) {
      // 운동 중이지 않고, 남은 시간이 0 이하, 브레이크 타임일 때 => 운동으로 전환
      setIsBreak(false);
      setTimerRep(rep);
      setTimerRunningTime(runningTime);
    }
  }, [isTimerRunning]);

  // 1초 감소할 때마다 개수, 토탈 증감소
  useEffect(() => {
    if (timerRunningTime <= 0) {
      if (!isBreak) setTimerSets((prev) => prev + 1);
      clearInterval(intervalId);
      setisTimerRunning(false);
    }
    if (isTimerRunning && !isBreak) {
      if (timerRunningTime <= (timerRep - 1) * (runningTime / rep)) {
        setTimerRep((prev) => prev - 1);
        setTimerTotal((prev) => prev + 1);
      }
    }
  }, [timerRunningTime]);

  // setInterval 내부 함수, 1초씩 감소
  const timeDecrement = () => {
    setTimerRunningTime((prev) => prev - 1);
  };

  // 1초마다 남은 렙스 횟수를 감소시킴, running time이 지나면 종료, 종료 후 set 증가
  // gogo 버튼 재생 함수
  const timerActive = () => {
    if (!isTimerRunning) {
      console.log("시작");
      const timer = setInterval(timeDecrement, 1000);
      setIntervalId(timer);
      setisTimerRunning(true);
    } else {
      console.log("일시정지");
      clearInterval(intervalId);
      setisTimerRunning(false);
    }
  };

  // 프로그레스 바 게이지 계산
  const progressGauge = () => {
    let thisResult = 0;
    // break mode
    if (!isBreak) {
      thisResult = timerRunningTime / runningTime;
    } else {
      // workout mode
      thisResult = timerRunningTime / restTime;
    }
    return 1 - thisResult;
  };

  // 운동 시간, 쉬는 시간, 남은 시간 보여주기
  const timerSetting = () => {
    if (!isBreak) {
      return secToMin(timerRunningTime);
    } else {
      return secToMin(timerRunningTime);
    }
  };

  // 초를 분 단위로
  const secToMin = (sec) => {
    let parseSec = parseInt(sec % 60);
    parseSec = parseSec < 10 ? "0" + parseSec : parseSec;
    return parseInt(sec / 60) + ":" + parseSec;
  };

  // 이전 화면으로 전환
  const goPre = () => {
    props.navigation.replace("MyRoutineList");
  };

  return loading ? (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.topbar_text}>LETFIT</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.body_topBox}>
          <View style={styles.title}>
            <Text style={styles.title_parts}>{item.body_part}</Text>
            <Text style={styles.title_exercise}>{item.name}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.body_topBox_question}
          >
            <View style={styles.body_topBox_question_imgBox}>
              <Image
                source={require("../Image/howdo_bnt.png")}
                style={styles.body_topBox_question_img}
              />
            </View>
            <Text style={styles.body_topBox_question_text}>HOW DO</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body_timerBox}>
          <View>
            <Text style={styles.body_timerBox_topText}>TOTAL TIME</Text>
            <Text style={styles.body_timerBox_topTime}>
              {secToMin(totalTime)}
            </Text>
          </View>
          <Progress.Circle
            progress={progressGauge()}
            thickness={15}
            strokeCap="square"
            color="#D63417"
            unfilledColor="#DEDEDF"
            borderColor="#DEDEDF"
            borderRadius="0"
            size={190}
            marginTop={20}
            marginBottom={20}
          />
          <Text style={styles.body_count}>{timerRep}</Text>
          <Text style={styles.body_restTime}>{timerSetting()}</Text>
        </View>
        <View>
          <View style={styles.body_counterBox}>
            <Text style={styles.body_counterBox_title}>SET</Text>
            <View style={styles.body_counterBox_num}>
              <Text style={styles.body_counterBox_count}>{timerSets}</Text>
              <Text style={styles.body_counterBox_text}>/</Text>
              <Text style={styles.body_counterBox_text}>{set}</Text>
            </View>
          </View>
          <View style={styles.body_counterBox}>
            <Text style={styles.body_counterBox_title}>TOTAL</Text>
            <View style={styles.body_counterBox_num}>
              <Text style={styles.body_counterBox_count}>{timerTotal}</Text>
              <Text style={styles.body_counterBox_text}>/</Text>
              <Text style={styles.body_counterBox_text}>{rep * set}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={timerActive}
          style={styles.body_play_box}
        >
          <Image
            source={require("../Image/play_work_bnt.png")}
            style={styles.body_play}
          />
        </TouchableOpacity>
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
