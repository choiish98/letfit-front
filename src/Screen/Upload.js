import React, { useEffect, useState } from "react";
import { View, Text, Image, AsyncStorage, StyleSheet, Button } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { API_URL } from "@env";

const Upload = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
    
  const goSNS = () => {
    props.navigation.replace("SNS");
  };
  
  const requestUpload = () => {
    var dataToSend = {
      title: title,
      description: description,
      photo: photo,
    };

    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    AsyncStorage.getItem("token").then((token) => {
        console.log(token);
        // 업로드 요청
        fetch(`https://bitter-jellyfish-92.loca.lt/api/posts/upload/`, {
            headers: {
                "method": "POST",
                body: formBody,
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                Authorization: `X-JWT ${token}`,
            },
        }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.title === title) {
                console.log("upload success");
                goSNS();
            }
        })
        .catch((error) => {
        console.log(error);
        });
    })
  };
  
  return (
    <View>
        <View>
            <Text>title</Text>
            <TextInput 
                value={title}
                onChangeText={(text) => setTitle(text)}
                autoCapitalize="sentences"
                autoCorrect
                returnKeyType="next"
            />
            <Text>photo</Text>
            <Text>description</Text>
            <TextInput 
                value={description}
                onChangeText={(text) => setDescription(text)}
                autoCapitalize="sentences"
                autoCorrect
                returnKeyType="done"
            />
        </View>
        <TouchableOpacity activeOpacity={0.5} onPress={requestUpload}>
            <Text>Upload</Text>
        </TouchableOpacity>
    </View>    
  );
};

export default Upload;
