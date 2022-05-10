import React, { useState } from "react";
import { View, Text, Image, StyleSheet, AsyncStorage } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "@env";
import TopBar from "../Components/TopBar";

const ProfileEdit = (props) => {
  const userInfo = props.route.params.userInfo;
  const [prfMsg, setPrfMsg] = useState(userInfo.profile_message);
  const [image, setImage] = useState(
    `https://sour-papers-grab-121-146-124-174.loca.lt` + userInfo.avatar
  );
  const [photo, setPhoto] = useState("");

  const goBack = () => {
    props.navigation.goBack();
  };

  // 프로필 이미지 클릭 시
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
      console.log("photo: " + photo);
    }
  };

  const getPhoto = () => {
    let localUri = photo.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    return { uri: localUri, name: filename, type };
  };

  // 적용 버튼 클릭 시
  const done = async () => {
    const token = await AsyncStorage.getItem("token");
    let formData = new FormData();

    formData.append("profile_message", prfMsg);
    photo === ""
      ? console.log("photo가 비었네요.")
      : formData.append("avatar", getPhoto());

    try {
      await fetch(
        `https://sour-papers-grab-121-146-124-174.loca.lt/api/users/me/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/formdata",
            Authorization: `X-JWT ${token}`,
          },
          body: formData,
        }
      );
      goBack();
    } catch (error) {
      console.log("error in done: " + error);
    }
  };

  return (
    <View style={styles.container}>
      <TopBar navigation={props.navigation} SNS Edit />
      <View style={styles.body}>
        <View style={styles.userInfo}></View>
        <View style={styles.feed}>
          <View style={styles.profile}>
            <TouchableOpacity activeOpacity={0.5} onPress={pickImage}>
              <Image
                style={styles.userInfo_tier_goal_staff}
                source={{ uri: image }}
                width={180}
                height={180}
                borderRadius={100}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.feed_profile_message}>
            <TextInput
              style={styles.feed_profile_message_text}
              value={prfMsg}
              onChangeText={(text) => setPrfMsg(text)}
              autoCapitalize="sentences"
              autoCorrect
              placeholder="프로필 메세지를 입력하세요."
              placeholderTextColor="#DEDEDE"
            />
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={goBack}
              style={styles.btn_box}
            >
              <Text style={styles.btn_text}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={done}
              style={styles.btn_box}
            >
              <Text style={styles.btn_text}>적용</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 7.5,
  },
  userInfo: {
    flex: 1,
    backgroundColor: "#DEDEDE",
  },
  profile: {
    position: "absolute",
    bottom: "85%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#F9F5EE",
    width: 180,
    height: 180,
    borderRadius: 150,
  },
  feed: {
    flex: 3,
    backgroundColor: "#2A3042",
  },
  feed_profile_message: {
    paddingTop: 100,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  feed_profile_message_text: {
    fontSize: 18,
    color: "white",
  },
  btn: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    height: 300,
  },
  btn_box: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#DEDEDE",
  },
  btn_text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2A3042",
  },
});

function mapStateToProps(state) {
  return { user: state };
}

function mapDispatchToProps(dispatch) {
  return {
    defineUser: (user) => dispatch(actionCreators.defineUser(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
