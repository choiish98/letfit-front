import React, { useEffect, useState } from "react";
import { View, Text, Image, AsyncStorage, StyleSheet, Button } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { API_URL } from "@env";

const Upload = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [image, setImage] = useState(null);
    
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setPhoto(result);
    }
  };

  const goSNS = () => {
    props.navigation.replace("SNS");
  };
  
  const requestUpload = () => {
    let localUri = photo.uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('title', title);
    formData.append('photo', { uri: localUri, name: filename, type });
    formData.append('description', description);

    AsyncStorage.getItem("token").then((token) => {
        console.log(token);
        console.log(image);
        // 업로드 요청
        fetch(`https://shy-eel-62.loca.lt/api/posts/upload/`, {
          "method": "POST",
          body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `X-JWT ${token}`,
            },
        }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          console.log("upload success");
          goSNS();
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
            <Button title="photo" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
