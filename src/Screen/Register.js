import React, { createRef, useState } from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Loader from "../Components/Loader";

const Register = ({ navigation }) => {
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const userIdRef = createRef();
  const userEmailRef = createRef();
  const userNameRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmRef = createRef();
  const locationRef = createRef();

  const handleSubmitButton = () => {
    setErrorText("");
    if (!userID) {
      alert("Please fill ID");
      return;
    }
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
    if (!location) {
      alert("Please fill location");
      return;
    }

    setLoading(true);

    var dataToSend = {
      name: userID,
      username: userName,
      email: userEmail,
      password: userPassword,
      password2: userPasswordConfirm,
      location: location,
    };

    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("http://localhost:4000/join", {
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
          setIsRegistrationSuccess(true);
          console.log("Registration Successful. Please Login to proceed");
        } else {
          setErrortext(responseJson.msg);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });

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
  };

  return (
    <View>
      <ScrollView>
        <Loader loading={loading} />
        <KeyboardAvoidingView enabled>
          <View>
            <TextInput
              placeholder="Enter User ID"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={(UserID) => setUserID(UserID)}
              ref={userIdRef}
              onSubmitEditing={() => {
                userIdRef.current && userIdRef.current.focus();
              }}
            />
          </View>
          <View>
            <TextInput
              placeholder="Enter Email"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              ref={userEmailRef}
              onSubmitEditing={() => {
                userEmailRef.current && userEmailRef.current.focus();
              }}
            />
          </View>
          <View>
            <TextInput
              placeholder="Enter Name"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={(UserName) => setUserName(UserName)}
              ref={userNameRef}
              onSubmitEditing={() => {
                userNameRef.current && userNameRef.current.focus();
              }}
            />
          </View>
          <View>
            <TextInput
              placeholder="Enter Password"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
              ref={passwordRef}
              onSubmitEditing={() => {
                passwordRef.current && passwordRef.current.focus();
              }}
            />
          </View>
          <View>
            <TextInput
              placeholder="Enter Password Confirm"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={(UserPasswordConfirm) =>
                setUserPasswordConfirm(UserPasswordConfirm)
              }
              ref={passwordConfirmRef}
              onSubmitEditing={() => {
                passwordConfirmRef.current &&
                  passwordConfirmRef.current.focus();
              }}
            />
          </View>
          <View>
            <TextInput
              placeholder="Enter Location"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={(Location) => setLocation(Location)}
              ref={locationRef}
              onSubmitEditing={() => {
                locationRef.current && locationRef.current.focus();
              }}
            />
          </View>
          <TouchableOpacity onPress={handleSubmitButton}>
            <Text>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text>go to Login</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Register;
