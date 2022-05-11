import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../Styles/uploadStyle";

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

  const goBack = () => {
    props.navigation.goBack();
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
      fetch(
        `https://new-bobcats-spend-121-146-124-174.loca.lt/api/posts/upload/`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `X-JWT ${token}`,
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.text())
        .then((responseJson) => {
          console.log(responseJson);
          console.log("upload success");
          goBack();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity activeOpacity={0.5} onPress={goBack}>
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

export default Upload;
