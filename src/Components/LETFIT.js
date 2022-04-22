import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screen/Home";
import SNS from "../Screen/SNS";
import Upload from "../Screen/Upload";
import Detail from "./Detail";
import MyRoutineList from "../Screen/MyRoutineList";
import RoutineList from "../Screen/RoutineList";
import Exercise from "../Screen/Exercise";
import Exercise_done from "../Screen/Exercise_done";

const Stack = createStackNavigator();

const LETFIT = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SNS"
        component={SNS}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Upload"
        component={Upload}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyRoutineList"
        component={MyRoutineList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RoutineList"
        component={RoutineList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Exercise"
        component={Exercise}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Exercise_done"
        component={Exercise_done}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default LETFIT;
