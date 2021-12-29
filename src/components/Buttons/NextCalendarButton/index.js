import React from "react";
import { TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./style.js";
export default function NextCalendarButton(props) {
  return (
    <TouchableOpacity
      title="Next"
      onPress={() => props.onPress()}
      style={styles.container}
      underlayColor="#fff"
    >
      <Text style={styles.text}>
        <Icon name="right" size={20} color="black" />
      </Text>
    </TouchableOpacity>
  );
}
