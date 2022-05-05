import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const TopBar = (props) => {
  const isSNS = props.SNS ? true : false;
  const imgLink = isSNS
    ? require("../Image/back_bnt.png")
    : require("../Image/back_white_bnt.png");

  const goPre = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.topbar(isSNS)}>
      {!props.Home && (
        <TouchableOpacity activeOpacity={0.5} onPress={goPre}>
          <Image source={imgLink} style={styles.topbar_back_img} />
        </TouchableOpacity>
      )}
      <Text style={styles.topbar_text(isSNS)}>LETFIT</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topbar: (SNS) => {
    const bgColor = SNS ? "#DEDEDE" : "#2A3042";

    return {
      flex: 0.8,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      width: "100%",
      backgroundColor: bgColor,
      paddingBottom: 15,
    };
  },
  topbar_back_img: {
    width: 13,
    height: 23,
  },
  topbar_text: (SNS) => {
    const color = SNS ? "#2A3042" : "white";

    return {
      width: "30%",
      marginLeft: "28%",
      marginRight: "35%",
      textAlign: "center",
      fontSize: 25,
      fontWeight: "600",
      color: color,
    };
  },
});

export default TopBar;
