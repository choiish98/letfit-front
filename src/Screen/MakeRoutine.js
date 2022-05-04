import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { API_URL } from "@env";
import Loader from "../Components/Loader";

// + 버튼 눌렀을 때 해시 태그 추가
// 요일 별 클릭 시 전환
// 요일 별 부위 지정

const RoutineList = (props) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  let makeExercise = [
    {
      day: "월",
      exercise: [],
    },
    {
      day: "화",
      exercise: [],
    },
    {
      day: "수",
      exercise: [],
    },
    {
      day: "목",
      exercise: [],
    },
    {
      day: "금",
      exercise: [],
    },
    {
      day: "토",
      exercise: [],
    },
    {
      day: "일",
      exercise: [],
    },
  ];

  const firstAction = () => {
    setLoading(true);
  };

  useEffect(() => {
    loading === false ? firstAction() : console.log("전체 루틴 리스트 페이지");
  });

  const renderItem = ({ item }) => {
    return (
      <View style={styles.todayExerciseCard}>
        <Text style={styles.todayExerciseCard_text_grey}>{item.body_part}</Text>
        <Text style={styles.todayExerciseCard_text}>{item.name}</Text>
      </View>
    );
  };

  const renderFeed = () => {
    return (
      <FlatList
        data={makeExercise}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    );
  };

  const goPre = () => {
    props.navigation.replace("RoutineList");
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
        <View style={styles.titleBox}>
          <TextInput
            style={styles.titleBox_text}
            value={title}
            onChangeText={(text) => setTitle(text)}
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            placeholder="루틴 제목을 입력하세요."
          />
        </View>
        <View style={styles.hashtagBox}>
          <TouchableOpacity activeOpacity={0.5}>
            <Image
              source={require("../Image/tag_add_bnt.png")}
              style={styles.hashtagBox_img}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.calander}>
          <View style={styles.calader_day}>
            <Text style={styles.calader_day_Text}>등</Text>
            <View style={styles.calader_day_bar}></View>
            <Text style={styles.calader_day_Text}>월</Text>
          </View>
          <View style={styles.calader_day}>
            <Text style={styles.calader_day_Text}>등</Text>
            <View style={styles.calader_day_bar}></View>
            <Text style={styles.calader_day_Text}>화</Text>
          </View>
          <View style={styles.calader_day}>
            <Text style={styles.calader_day_Text}>등</Text>
            <View style={styles.calader_day_bar}></View>
            <Text style={styles.calader_day_Text}>수</Text>
          </View>
          <View style={styles.calader_day}>
            <Text style={styles.calader_day_Text}>등</Text>
            <View style={styles.calader_day_bar}></View>
            <Text style={styles.calader_day_Text}>목</Text>
          </View>
          <View style={styles.calader_day}>
            <Text style={styles.calader_day_Text}>등</Text>
            <View style={styles.calader_day_bar}></View>
            <Text style={styles.calader_day_Text}>금</Text>
          </View>
          <View style={styles.calader_day}>
            <Text style={styles.calader_day_Text}>등</Text>
            <View style={styles.calader_day_bar}></View>
            <Text style={styles.calader_day_Text}>토</Text>
          </View>
          <View style={styles.calader_day}>
            <Text style={styles.calader_day_reText}>휴식</Text>
            <View style={styles.calader_day_bar}></View>
            <Text style={styles.calader_day_Text}>일</Text>
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
    flex: 7.5,
    width: "90%",
    marginLeft: "5%",
  },
  titleBox: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  titleBox_text: {
    fontSize: 25,
  },
  hashtagBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#242A3D",
  },
  hashtagBox_img: {
    width: 10,
    height: 10,
  },
  calander: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#464B58",
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
  calader_day_Text: {
    color: "#2A3042",
    fontWeight: "600",
  },
  calader_day_reText: {
    color: "#DEDEDE",
    fontWeight: "600",
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

export default connect(mapStateToProps, mapDispatchToProps)(RoutineList);
