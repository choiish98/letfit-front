import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import Screens
import SplashScreen from "./src/Screen/SplashScreen";
import Auth from "./src/Components/Auth";
import Navigation from "./src/Components/Navigation";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Navigation" component={Navigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
