import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import styles from "./style";
import { useSelector, useDispatch } from "react-redux";
export default function index(props) {
  const dailyDate = useSelector((state) => {
    return state.dateReducer.dailyDate;
  });
  const weeklyDate = useSelector((state) => {
    return state.dateReducer.weeklyDate;
  });
  //console.log("cur@@", props.currentDate);
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
          {weeklyDate.getMonth() + 1} &nbsp;
          {weeklyDate.getDate()} &nbsp;
          {weekDays[weeklyDate.getDay()]}
        </Text>
      );
    case "D":
      return (
        <Text style={styles.text}>
          {console.log("dailyDate.getMonth in Text : ", dailyDate?.getMonth())}
          {dailyDate?.getMonth() + 1} &nbsp;
          {dailyDate?.getDate()} &nbsp;
          {weekDays[dailyDate?.getDay()]}
        </Text>
      );
    default:
      return <Text>Default</Text>;
  }
}
