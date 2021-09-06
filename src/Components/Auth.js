import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import Screens
import Login from "../Screen/Login";
import Register from "../Screen/Register";

const Stack = createStackNavigator();

const Auth = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default Auth;
