import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ScrollView, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { styles } from "../Styles/routineDetail";
import Loader from "../Components/Loader";
import TopBar from "../Components/TopBar";
import ExerciseCard from "../Components/ExerciseCard";
import Calander from "../Components/Calander";

const RoutineDetail = (props) => {
  const routineId = props.route.params;
  const [loading, setLoading] = useState(true);
  const [thisRoutine, setThisRoutine] = useState({}); // 루틴 days
  const [routineInfo, setRoutineInfo] = useState({}); // 루틴 id
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

  // 루틴 받아오기
  const routineDetail = async () => {
    // 요일 별 부위
    try {
      const response = await fetch(
        `https://shiny-turtles-jump-121-146-124-174.loca.lt/api/routines/${routineId}/days`
      );
      const routineData = await response.json();
      setThisRoutine(routineData);
    } catch (error) {
      console.log("error in routineDetail: " + error);
    }
  };

  // 요일 별 부위 삽입
  const putBodyParts = (routineData) => {
    routineData.map((routine) => {
      switch (routine.day) {
        case "월":
          setMon(mon + routine.body_parts);
          break;
        case "화":
          setTue(tue + routine.body_parts);
          break;
        case "수":
          setWed(wed + routine.body_parts);
          break;
        case "목":
          setThu(thu + routine.body_parts);
          break;
        case "금":
          setFri(fri + routine.body_parts);
          break;
        case "토":
          setSat(sat + routine.body_parts);
          break;
        case "일":
          setSun(sun + routine.body_parts);
          break;
      }
    });
  };

  // 전체 운동 저장
  const getEntireEx = async () => {
    try {
      const response = await fetch(
        `https://shiny-turtles-jump-121-146-124-174.loca.lt/api/routines/${routineId}/exercises`
      );
      const thisEntireEx = await response.json();
      setEntireExercise(thisEntireEx);
    } catch (error) {
      console.log("error in getEntireEx: " + error);
    }
  };

  // 루틴 디테일 가져오기
  const getRoutineDetail = async () => {
    try {
      const response = await fetch(
        `https://shiny-turtles-jump-121-146-124-174.loca.lt/api/routines/${routineId}`
      );
      const thisRoutineDetail = await response.json();
      setRoutineInfo(thisRoutineDetail);
    } catch (error) {
      console.log("error in getRoutineDetail: " + error);
    }
  };

  const firstAction = async () => {
    console.log("로딩 중");
    await routineDetail();
    setClickedDay("mon");
    await getEntireEx();
    await getRoutineDetail();
    setLoading(false);
  };

  const afterLoading = () => {
    putBodyParts(thisRoutine);
    console.log("로딩 완료");
  };

  useEffect(() => {
    loading ? firstAction() : afterLoading();
  }, [loading]);

  // 루틴 가져오기
  const takeRoutine = async () => {
    try {
      // token 받아오기
      const token = await AsyncStorage.getItem("token");
      await fetch(
        `https://shiny-turtles-jump-121-146-124-174.loca.lt/api/users/routine/${routineId}`,
        {
          method: "POST",
          headers: {
            Authorization: `X-JWT ${token}`,
          },
        }
      );
      props.navigation.goBack();
    } catch (error) {
      console.log("error in getUserData: " + error);
    }
  };

  // 요일 별 부위 검사 후 부위에 맞는 운동 삽입
  const updateExercise = (today) => {
    const tempArray = []; // 운동 리스트 저장 배열
    const tempBody = today.split(","); // 오늘 운동 부위

    if (entireExercise !== null || entireExercise !== "undefined") {
      entireExercise.map((item) => {
        if (tempBody.includes(item.exercise.body_part)) {
          const thisExercise = {};
          thisExercise.body_part = "[" + item.exercise.body_part + "]";
          thisExercise.name = item.exercise.name;
          thisExercise.runningTime = item.seconds_per_set;
          thisExercise.restTime = item.break_seconds_per_set;
          thisExercise.reps = item.exercise_number_per_set;
          tempArray.push(thisExercise);
        }
      });
    }

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

  // get user profile img
  const avatarIsNull = () => {
    return require("../../assets/Icon/like_profile_base.png");
  };

  // hastags array to <text>
  const getHashTags = () => {
    let result = [];

    routineInfo.hashtags.map((item) => {
      result.push(
        <View style={styles.hashtags_border}>
          <Text style={styles.hashtags}>#{item.name}</Text>
        </View>
      );
    });

    return <View style={styles.hashtags_box}>{result}</View>;
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <TopBar navigation={props.navigation} />
      <View style={styles.body}>
        <View style={styles.userInfo}>
          <View style={styles.creator_box}>
            <View style={styles.profile}>
              <Image style={styles.profile_img} source={avatarIsNull()} />
            </View>
            <View>
              <Text style={styles.username}>
                {routineInfo.creator.username}
              </Text>
            </View>
          </View>
          <Text style={styles.routineName}>{routineInfo.name}</Text>
          {getHashTags()}
          <View style={styles.toolBox}>
            <TouchableOpacity onPress={takeRoutine} style={styles.btn}>
              <Text style={styles.btn_text}>루틴 가져오기</Text>
            </TouchableOpacity>
            <Text style={styles.follower}>
              팔로워 수 {routineInfo.followers}명
            </Text>
          </View>
        </View>
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
