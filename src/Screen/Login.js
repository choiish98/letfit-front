import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, AsyncStorage } from "react-native";
import { API_URL } from "@env";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Loader from "../Components/Loader";

const Login = (props) => {
  const [username, setUserName] = useState("");
  const [password, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleSubmit = () => {
    setErrorText("");

    if (!username) {
      alert("Please fill Name");
      return;
    }
    if (!password) {
      alert("Please fill Password");
      return;
    }

    setLoading(true);

    var dataToSend = {
      username: username,
      password: password,
    };

    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    // 로그인 요청
    fetch(`https://wicked-catfish-71.loca.lt/api/users/token/`, {
      method: "POST",
      body: formBody,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log(JSON.stringify(response, null, 4));
        return response.json();
      })
      .then((responseJson) => {
        setLoading(false);
        console.log(responseJson);

        // 토큰 값 저장
        AsyncStorage.setItem("token", responseJson.token);

        // main으로 화면 이동
        props.navigation.replace("LETFIT");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView enabled>
          <TextInput
            onChangeText={(UserName) => {
              setUserName(UserName);
            }}
            placeholder="Enter Name"
            autoCapitalize="none"
            returnKeyType="next"
            blurOnSubmit={false}
          />
          <TextInput
            onChangeText={(Password) => {
              setUserPassword(Password);
            }}
            placeholder="Enter Password"
            autoCapitalize="none"
            returnKeyType="next"
            secureTextEntry={true}
            blurOnSubmit={false}
          />
          {errorText != "" ? <Text>{errorText}</Text> : null}
          <TouchableOpacity activeOpacity={0.5} onPress={handleSubmit}>
            <Text>Login</Text>
          </TouchableOpacity>
          <Text
            onPress={() => {
              props.navigation.navigate("Register");
            }}
          >
            New Here? Register
          </Text>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Login;
