import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { actionCreators } from "../store";

const SNS = (props) => {
  return (
    <View>
      <Text> Hello {props.user.username} </Text>
    </View>
  );
};

function mapStateToProps(state) {
  return { user: state };
}

function mapDispatchToProps(dispatch) {
  return {
    defineUser: (user) => dispatch(actionCreators.defineUser(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SNS);