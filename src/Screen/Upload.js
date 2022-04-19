import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  AsyncStorage,
  StyleSheet,
  Button,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "@env";

const Upload = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [image, setImage] = useState(require("../Image/camera.png"));

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

  const goHome = () => {
    props.navigation.navigate("Home");
  };

  const requestUpload = () => {
    let localUri = photo.uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append("title", title);
    formData.append("photo", { uri: localUri, name: filename, type });
    formData.append("description", description);

    AsyncStorage.getItem("token").then((token) => {
      console.log(token);
      console.log(image);
      // 업로드 요청
      fetch(`https://heavy-wasp-16.loca.lt/api/posts/upload/`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `X-JWT ${token}`,
          Accept: "application/json",
        },
      })
        .then((response) => response.text())
        .then((responseJson) => {
          console.log(responseJson);
          console.log("upload success");
          goSNS();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity activeOpacity={0.5} onPress={goHome}>
          <Image source={require("../Image/back.png")} width={30} height={30} />
        </TouchableOpacity>
        <Text style={styles.topbar_text}>게시글 작성</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={requestUpload}>
          <Image
            source={require("../Image/Upload.png")}
            width={30}
            height={30}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.imagePicker}>
        <TouchableOpacity activeOpacity={0.5} onPress={pickImage}>
          <Image source={image} style={styles.imagePicker_imgage} />
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
      <View style={styles.description}>
        <TextInput
          style={styles.description_text}
          value={title}
          onChangeText={(text) => setTitle(text)}
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          placeholder="제목을 입력하세요."
        />
        <TextInput
          style={styles.description_text}
          value={description}
          onChangeText={(text) => setDescription(text)}
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="done"
          placeholder="내용을 입력하세요."
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topbar: {
    flex: 0.6,
    paddingTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2A3042",
  },
  topbar_text: {
    fontSize: 25,
    color: "#2A3042",
    fontWeight: "600",
    color: "white",
  },
  imagePicker: {
    flex: 2,
    alignItems: "center",
    backgroundColor: "#DEDEDE",
  },
  imagePicker_imgage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 150,
    height: 150,
    marginTop: 30,
  },
  description: {
    flex: 5,
  },
  description_text: {
    margin: 10,
    marginLeft: 20,
    marginTop: 20,
    fontSize: 20,
  },
});

export default Upload;
