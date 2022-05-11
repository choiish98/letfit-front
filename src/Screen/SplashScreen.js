import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);

      AsyncStorage.getItem("token").then((value) => {
        navigation.replace(value === null ? "Auth" : "LETFIT");
      });
    }, 3000);
  }, []);

  return (
    <View>
      <ActivityIndicator animating={animating} color="#ffffff" size="large" />
    </View>
  );
};

export default SplashScreen;
