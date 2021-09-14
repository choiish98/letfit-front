import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import Screens
import SplashScreen from "./src/Screen/SplashScreen";
import Login from "./src/Screen/Login";
import Register from "./src/Screen/Register";
import AppMain from "./src/Components/AppMain";
import { Provider } from "react-redux";
import store from "./src/store";

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="AppMain" component={AppMain} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
