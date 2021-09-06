import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screen/Home";

const Stack = createStackNavigator();

const Navigation = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default Navigation;
