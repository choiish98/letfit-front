import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screen/Home";
import SNS from "../Screen/SNS";
import Upload from "../Screen/Upload";
import Detail from "./Detail";
import MyRoutineList from "../Screen/MyRoutineList";

const Stack = createStackNavigator();

const AppMain = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SNS" component={SNS} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Upload" component={Upload} />
      <Stack.Screen name="MyRoutineList" component={MyRoutineList} />
    </Stack.Navigator>
  );
};

export default AppMain;
