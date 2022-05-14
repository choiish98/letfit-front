import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";

const CustomModal = (props) => {
  // 정렬 기능 - 팔로우
  const followSort = () => {
    let thisRoutine = props.renderRoutine;
    thisRoutine.sort((a, b) => {
      return a.followers - b.followers;
    });

    setRenderRoutine(thisRoutine);
    props.toggleModal();
  };

  // 정렬 기능 - 티어
  const tierSort = () => {
    let thisRoutine = props.renderRoutine;
    thisRoutine.sort((a, b) => {
      return b.followers - a.followers;
    });

    setRenderRoutine(thisRoutine);
    props.toggleModal();
  };

  return (
    <View>
      <Modal isVisible={props.isModalVisible} backdropColor="white">
        <View style={styles.modal}>
          <View>
            <TouchableOpacity activeOpacity={0.5} onPress={followSort}>
              <Text style={styles.modal_text}>팔로우순</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={tierSort}>
              <Text style={styles.modal_text}>티어순</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.5} onPress={props.toggleModal}>
            <Image
              source={require("../../assets/Icon/routine_del_work_bnt.png")}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "30%",
  },
  modal_text: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "600",
  },
});

export default CustomModal;
