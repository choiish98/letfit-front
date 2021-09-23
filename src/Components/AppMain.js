import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screen/Home";
import SNS from "../Screen/SNS";

const Stack = createStackNavigator();

const AppMain = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SNS" component={SNS} />
    </Stack.Navigator>
  );
};

export default AppMain;
