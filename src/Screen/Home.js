import React from "react";
import { View, Text, AsyncStorage } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = ({ navigation }) => {
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Auth");
  };

  return (
    <View>
      <Text> Here is Home Screen !</Text>
      <TouchableOpacity activeOpacity={0.5} onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
