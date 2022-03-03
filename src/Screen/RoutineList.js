import React, { useEffect, useState } from "react";
import { View, Text, TextInput} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import {API_URL} from "@env";
import Loader from "../Components/Loader";

const RoutineList = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState();

  const search = () => {
    console.log(searchInput);
  }

  const setRoutineData = () => {
    console.log(props.user);
  }

  const firstAction = () => {
    setRoutineData();
    setLoading(true);
  }

  useEffect(() => {
    loading === false
      ? firstAction()
      : console.log("전체 루틴 리스트");
  });

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.creator.username}</Text>
        <Text>{item.followers}</Text>
        <Text>{item.name}</Text>
      </View>
    );
  };

  const renderFeed = () => {
    return (
      <FlatList
        data={props.user.routineData}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    );
  };

  return loading ? (
    <View>
        <Text>루틴리스트</Text>
        <Text>추천순</Text>
        <Text>+</Text>
        <TextInput 
          placeholder="검색어를 입력하세요 WWW"
          onChangeText={(userInput) => setSearchInput(userInput)}
        />
        <TouchableOpacity activeOpacity={0.5} onPress={search}>
          <Text>검색</Text>
        </TouchableOpacity>
        <View>{renderFeed()}</View>
    </View>
  ) : (
    Loader
  );
};


function mapStateToProps(state) {
  return { user: state };
}

function mapDispatchToProps(dispatch) {
  return {
    defineUser: (user) => dispatch(actionCreators.defineUser(user)),
    deleteUser: () => dispatch(actionCreators.deleteUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineList);
