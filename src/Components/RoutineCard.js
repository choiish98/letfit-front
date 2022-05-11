import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../Styles/routineCard";

const RoutineCard = (props) => {
  const item = props.item;

  // hashTag thisTags에 저장
  const getHashTags = () => {
    var thisTags = [];
    item.hashtags.map((thisTag) => {
      thisTags.push("#" + thisTag.name + "  ");
    });

    return thisTags;
  };

  // get user profile img
  const avatarIsNull = async () => {
    if (item.creator.avatar === "")
      return `require("../Image/like_profile_base.png")`;

    return { uri: item.creator.avatar };
  };

  return (
    <View>
      <View style={styles.list_top}>
        <View style={styles.list_top_rank}>
          <Text style={styles.list_top_rank_text}>1</Text>
          <Text style={styles.list_top_rank_underLine}> </Text>
        </View>
        <View style={styles.list_top_rank_info}>
          <Text style={styles.list_top_rank_info_name}>{item.name}</Text>
          <Text style={styles.list_top_rank_info_follow}>
            {item.followers}명이 팔로우 중
          </Text>
        </View>
      </View>
      <View style={styles.list_bottom}>
        <Text style={styles.list_hashtags}>{getHashTags()}</Text>
        <View style={styles.list_bottom_creator}>
          <Text style={styles.list_bottom_creator_username}>
            {item.creator.username}
          </Text>
          <Image
            source={avatarIsNull()}
            style={styles.list_bottom_creator_img}
          />
        </View>
      </View>
    </View>
  );
};

export default RoutineCard;
