import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { API_URL } from "@env";
import Loader from "../Components/Loader";

// 클릭했을 때 빨간 선 표시
// 루틴 정보 담는 api

const RoutineDetail = (props) => {
  const [loading, setLoading] = useState(false);
  const [thisRoutine, setThisRoutine] = useState({}); // 루틴 정보
  const [todayExercise, setTodayExercise] = useState([]); // 보여줄 운동 리스트
  const [clickedDay, setClickedDay] = useState(""); // 클릭 요일 저장
  const [entireExercise, setEntireExercise] = useState([]); // 전체 운동 저장

  // 이번 주 운동 저장
  const [mon, setMon] = useState("");
  const [tue, setTue] = useState("");
  const [wed, setWed] = useState("");
  const [thu, setThu] = useState("");
  const [fri, setFri] = useState("");
  const [sat, setSat] = useState("");
  const [sun, setSun] = useState("");

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

  // 루틴 받아오기
  const routineDetail = () => {
    const routineId = props.route.params;

    // 요일 별 부위
    fetch(
      `https://quiet-papers-repeat-121-146-124-174.loca.lt/api/routines/${routineId}/days`,
      {
        headers: {
          method: "GET",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        // 요일 별 부위 삽입
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

    // 전체 운동 저장
    fetch(
      `${`https://quiet-papers-repeat-121-146-124-174.loca.lt`}/api/routines/${routineId}/exercises`,
      {
        headers: {
          method: "GET",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setEntireExercise(responseJson[0].exercise);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const firstAction = () => {
    routineDetail();
    setClickedDay("mon");
    setLoading(true);
  };

  useEffect(() => {
    loading === false ? firstAction() : console.log("asdf");
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

  const goPre = () => {
    props.navigation.replace("RoutineList");
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

  return loading ? (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={goPre}
          style={styles.topbar_box}
        >
          <Image
            source={require("../Image/back_white_bnt.png")}
            style={styles.topbar_back_img}
          />
        </TouchableOpacity>
        <Text style={styles.topbar_text}>LETFIT</Text>
        <Text style={styles.topbar_box}> </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.userInfo}></View>
        <View style={styles.calander}>
          <TouchableOpacity
            onPress={() => {
              setClickedDay("mon");
            }}
            activeOpacity={0.5}
            style={styles.calader_day}
          >
            <Text>{arrToText(mon)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>월</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setClickedDay("tue");
            }}
            activeOpacity={0.5}
            style={styles.calader_day}
          >
            <Text>{arrToText(tue)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>화</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setClickedDay("wed");
            }}
            activeOpacity={0.5}
            style={styles.calader_day}
          >
            <Text>{arrToText(wed)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>수</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setClickedDay("thu");
            }}
            activeOpacity={0.5}
            style={styles.calader_day}
          >
            <Text>{arrToText(thu)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>목</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setClickedDay("fri");
            }}
            activeOpacity={0.5}
            style={styles.calader_day}
          >
            <Text>{arrToText(fri)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>금</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setClickedDay("sat");
            }}
            activeOpacity={0.5}
            style={styles.calader_day}
          >
            <Text>{arrToText(sat)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>토</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setClickedDay("sun");
            }}
            activeOpacity={0.5}
            style={styles.calader_day}
          >
            <Text>{arrToText(sun)}</Text>
            <View style={styles.calader_day_bar}></View>
            <Text>일</Text>
          </TouchableOpacity>
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
  calander: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(RoutineDetail);
