import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./style.js";
export default function NextCalendarButton(props) {
  return (
    <TouchableOpacity
      title="Next"
      onPress={() => props.onPress()}
      style={styles.container}
      underlayColor="#fff"
    >
      <Text style={styles.text}>Next</Text>
    </TouchableOpacity>
  );
}
