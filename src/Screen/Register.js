import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Loader from "../Components/Loader";

const Register = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const handleSubmitButton = () => {
    setErrorText("");
    if (!userEmail) {
      alert("Please fill Email");
      return;
    }
    if (!userName) {
      alert("Please fill Name");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    }
    if (!userPasswordConfirm) {
      alert("Please fill Password Confirm");
      return;
    }

    setLoading(true);

    var dataToSend = {
      username: userName,
      email: userEmail,
      password: userPassword,
    };

    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    if (userPassword == userPasswordConfirm) {
      fetch(`http://6bec-220-84-188-32.ngrok.io/api/users/`, {
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

          if (responseJson.username === userName) {
            setIsRegistrationSuccess(true);
            console.log("Registration Successful. Please Login to proceed");
          } else {
            setErrorText(responseJson.msg);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    } else {
      console.log("password and password confirm is not coinside");
    }
  };

  if (isRegistrationSuccess) {
    return (
      <View>
        <Text>Registration Successful</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <ScrollView>
        <Loader loading={loading} />
        <KeyboardAvoidingView enabled>
          <View>
            <TextInput
              placeholder="Enter Name"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={(UserName) => setUserName(UserName)}
            />
          </View>
          <View>
            <TextInput
              placeholder="Enter Email"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
            />
          </View>
          <View>
            <TextInput
              placeholder="Enter Password"
              autoCapitalize="sentences"
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
            />
          </View>
          <View>
            <TextInput
              placeholder="Enter Password Confirm"
              autoCapitalize="sentences"
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
              onChangeText={(UserPasswordConfirm) =>
                setUserPasswordConfirm(UserPasswordConfirm)
              }
            />
          </View>
          <TouchableOpacity onPress={handleSubmitButton}>
            <Text>Register</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Register;
