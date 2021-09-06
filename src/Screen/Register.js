import React from "react";
import { View, Text } from "react-native";

const Register = ({ navigation }) => {
  return (
    <View>
      <Text onPress={() => navigation.replace("Navigation")}>
        회원가입 하기
      </Text>
    </View>
  );
};

export default Register;
