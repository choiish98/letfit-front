import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import Screens
import SplashScreen from "./src/Screen/SplashScreen";
import Login from "./src/Screen/Login";
import Register from "./src/Screen/Register";
import LETFIT from "./src/Components/LETFIT";
import { Provider } from "react-redux";
import store from "./src/store";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen
            name="LETFIT"
            component={LETFIT}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
