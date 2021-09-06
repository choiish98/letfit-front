import React from "react";
import { View, Text } from "react-native";

const Login = ({ navigation }) => {
  return (
    <View>
      <Text onPress={() => navigation.replace("Register")}>
        New Here? Register
      </Text>
    </View>
  );
};

export default Login;
