import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { API_URL } from "@env";
import { styles } from "../Styles/makeRoutine";
import Loader from "../Components/Loader";
import TopBar from "../Components/TopBar";

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

  return loading ? (
    <View style={styles.container}>
      <TopBar navigation={props.navigation} />
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
        <View>{renderFeed()}</View>
        <TouchableOpacity activeOpacity={0.5} style={styles.exercise_plus}>
          <Image source={require("../Image/routine_add_bnt.png")} />
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(RoutineList);
