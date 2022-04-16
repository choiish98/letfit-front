import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { actionCreators } from "../Actions/userIndex";
import { routineActionCreators } from "../Actions/routineIndex";
import Loader from "../Components/Loader";
import * as Progress from "react-native-progress";

const Exercise = (props) => {
  const [loading, setLoading] = useState(true);

  const homeAction = () => {};

  useEffect(() => {
    loading === false
      ? homeAction()
      : console.log(
          "user: " +
            JSON.stringify(props.user) +
            "\nroutine: " +
            JSON.stringify(props.routine)
        );
  });

  const goHome = () => {
    props.navigation.replace("Home");
  };

  return loading ? (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.topbar_text}>LETFIT</Text>
      </View>
      <View style={styles.body}>
        <View>
          <Text>{props.route.params.item}</Text>
          <Text>?</Text>
        </View>
        <View>
          <View>
            <Text>TOTAL TIME</Text>
            <Text>12:15</Text>
          </View>
          <Text>빙빙 돌아가는 거</Text>
          <Text>지금까지 한 횟수</Text>
          <Text>남은 시간</Text>
        </View>
        <View>
          <View>
            <Text>SET</Text>
            <View>
              <Text>2</Text>
              <Text>/</Text>
              <Text>4</Text>
            </View>
          </View>
          <View>
            <Text>TOTAL</Text>
            <View>
              <Text>41</Text>
              <Text>/</Text>
              <Text>60</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  ) : (
    Loader
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topbar: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#2A3042",
  },
  topbar_text: {
    fontSize: 25,
    color: "#2A3042",
    fontWeight: "600",
    paddingBottom: 15,
    color: "white",
  },
  body: {
    flex: 7,
  },
});

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
