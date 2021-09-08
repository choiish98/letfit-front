import React, { createRef, useState } from "react";
import { View, Text, KeyboardAvoidingView, AsyncStorage } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Loader from "../Components/Loader";

const Login = ({ navigation }) => {
  const [userID, setUserID] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const userIDRef = createRef();
  const passwordRef = createRef();

  const handleSubmit = () => {
    setErrorText("");

    if (!userID) {
      alert("Please fill Email");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    }

    setLoading(true);

    let dataToSend = { id: userID, password: userPassword };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("어디로갈까요?", {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        console.log(responseJson);

        if (responseJson.status === "success") {
          AsyncStorage.setItem("user_id", responseJson.data.userID);
          console.log(responseJson.data.userID);
          navigation.replace("Navigation");
        } else {
          setErrortext(responseJson.msg);
          console.log("Please check your email id or password");
        }
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
        <KeyboardAvoidingView>
          <TextInput
            onChange={(UserID) => {
              setUserID(UserID);
            }}
            onSubmitEditing={() =>
              userIDRef.current && userIDRef.current.focus()
            }
            placeholder="Enter ID"
            autoCapitalize="none"
            returnKeyType="next"
            blurOnSubmit={false}
          />
          <TextInput
            onChange={(UserPassword) => {
              setUserPassword(UserPassword);
            }}
            onSubmitEditing={() =>
              passwordRef.current && passwordRef.current.focus()
            }
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
              navigation.navigate("Register");
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
