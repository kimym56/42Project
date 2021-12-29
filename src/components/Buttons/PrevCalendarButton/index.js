import React from "react";
import { TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./style.js";
export default function PrevCalendarButton(props) {
  return (
    <TouchableOpacity
      title="Previous"
      onPress={() => props.onPress()}
      style={styles.container}
    >
      <Text style={styles.text}>
        <Icon name="left" size={20} color="black" />
      </Text>
    </TouchableOpacity>
  );
}
