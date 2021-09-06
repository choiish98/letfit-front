import React from "react";
import { View, Text } from "react-native";

const SplashScreen = ({ navigation }) => {
  return (
    <View>
      <Text onPress={() => navigation.replace("Auth")}>
        go Log in or Register
      </Text>
    </View>
  );
};

export default SplashScreen;
