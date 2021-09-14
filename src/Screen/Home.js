import React from "react";
import { View, Text, AsyncStorage } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";

const Home = (props) => {
  const logout = async () => {
    props.deleteUser();
    await AsyncStorage.removeItem("token");
    props.navigation.replace("Auth");
  };

  return (
    <View>
      <Text> Hello {props.user.username} </Text>
      <Text> Here is Home Screen !</Text>
      <TouchableOpacity activeOpacity={0.5} onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

function mapStateToProps(state) {
  return { user: state };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteUser: () => dispatch(actionCreators.deleteUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
