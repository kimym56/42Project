import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./style.js";
export default function PrevCalendarButton(props) {
  return (
    <TouchableOpacity
      title="Previous"
      onPress={() => props.onPress()}
      style={styles.container}
    >
      <Text style={styles.text}>Prev</Text>
    </TouchableOpacity>
  );
}
