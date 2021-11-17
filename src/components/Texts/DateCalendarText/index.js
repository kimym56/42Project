import React from "react";
import { Text } from "react-native";
import styles from "./style";
export default function index(props) {
  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  switch (props.isMWD) {
    case "M":
      return (
        <Text style={styles.text}>
          {months[props.selectDate.getMonth()]} &nbsp;
          {props.selectDate.getFullYear()}
        </Text>
      );
    case "W":
      return (
        <Text style={styles.text}>
          {props.currentDate.getMonth() + 1} &nbsp;
          {props.currentDate.getDate()} &nbsp;
          {weekDays[props.currentDate.getDay()]}
        </Text>
      );
    case "D":
      return (
        <Text style={styles.text}>
          {props.currentDate.getMonth() + 1} &nbsp;
          {props.currentDate.getDate()} &nbsp;
          {weekDays[props.currentDate.getDay()]}
        </Text>
      );
    default:
      return <Text>Default</Text>;
  }
}
