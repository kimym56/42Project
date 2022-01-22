import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styles from "./style";
import { useSelector, useDispatch } from "react-redux";
export default function index(props) {
  const dailyDate = useSelector((state) => {
    return state.dateReducer.dailyDate;
  });
  const weeklyDate = useSelector((state) => {
    return state.dateReducer.weeklyDate;
  });
  const monthlyDate = useSelector((state) => {
    return state.dateReducer.monthlyDate;
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
  let firstDate = -1;
  let lastDate = -1;
  let week = -1;
  const changeWeeklyDateFormat = () => {
    console.log(weeklyDate.getDate());
    console.log("getDay", weeklyDate.getDay());
    let tempDate, tempDate2;
    console.log(weeklyDate.getMonth(), weeklyDate.getDate());
    tempDate = new Date(weeklyDate);
    tempDate2 = new Date(weeklyDate);

    if (weeklyDate.getDay() == 0) {
      firstDate = new Date(tempDate.setDate(weeklyDate.getDate()));
      firstDate.setMonth(tempDate.getMonth());
      lastDate = new Date(tempDate2.setDate(weeklyDate.getDate() + 6));
      lastDate.setMonth(tempDate2.getMonth());
    } else if (weeklyDate.getDay() == 1) {
      firstDate = new Date(tempDate.setDate(weeklyDate.getDate() - 1));
      firstDate.setMonth(tempDate.getMonth());
      lastDate = new Date(tempDate2.setDate(weeklyDate.getDate() + 5));
      lastDate.setMonth(tempDate2.getMonth());
    } else if (weeklyDate.getDay() == 2) {
      firstDate = new Date(tempDate.setDate(weeklyDate.getDate() - 2));
      firstDate.setMonth(tempDate.getMonth());
      lastDate = new Date(tempDate2.setDate(weeklyDate.getDate() + 4));
      lastDate.setMonth(tempDate2.getMonth());
    } else if (weeklyDate.getDay() == 3) {
      firstDate = new Date(tempDate.setDate(weeklyDate.getDate() - 3));
      firstDate.setMonth(tempDate.getMonth());
      lastDate = new Date(tempDate2.setDate(weeklyDate.getDate() + 3));
      lastDate.setMonth(tempDate2.getMonth());
    } else if (weeklyDate.getDay() == 4) {
      firstDate = new Date(tempDate.setDate(weeklyDate.getDate() - 4));
      firstDate.setMonth(tempDate.getMonth());
      lastDate = new Date(tempDate2.setDate(weeklyDate.getDate() + 2));
      lastDate.setMonth(tempDate2.getMonth());
    } else if (weeklyDate.getDay() == 5) {
      firstDate = new Date(tempDate.setDate(weeklyDate.getDate() - 5));
      firstDate.setMonth(tempDate.getMonth());
      lastDate = new Date(tempDate2.setDate(weeklyDate.getDate() + 1));
      lastDate.setMonth(tempDate2.getMonth());
    } else if (weeklyDate.getDay() == 6) {
      firstDate = new Date(tempDate.setDate(weeklyDate.getDate() - 6));
      firstDate.setMonth(tempDate.getMonth());
      lastDate = new Date(tempDate2.setDate(weeklyDate.getDate()));
      lastDate.setMonth(tempDate2.getMonth());

      console.log("first", firstDate.getMonth(), firstDate.getDate());
      console.log("last", lastDate.getMonth(), lastDate.getDate());
      console.log("sssss", weeklyDate.getDate());
    }

    /*
    if (Math.floor(firstDate / 7) != 0) {
      week = Math.floor(firstDate / 7) + 2;
    } else {
      week = firstDate;
    }
    */
    //console.log("week", week);
  };
  switch (props.isMWD) {
    case "M":
      return (
        <View
          style={{
            flex: 1,
            //backgroundColor: "#d9ebfc",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>
            {monthlyDate.getFullYear() + "년 "}
            {monthlyDate.getMonth() + 1 + "월"}
          </Text>
        </View>
      );
    case "W":
      changeWeeklyDateFormat();
      return (
        <View
          style={{
            flex: 1,
            //backgroundColor: "#d9ebfc",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>
            {firstDate.getMonth() + 1 + "월 " + firstDate.getDate() + "일 ~ "}
            {lastDate.getMonth() + 1 + "월 " + lastDate.getDate() + "일"}
          </Text>
        </View>
      );
    case "D":
      return (
        <View
          style={{
            flex: 1,
            //backgroundColor: "#d9ebfc",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>
            {console.log(
              "dailyDate.getMonth in Text : ",
              dailyDate?.getMonth()
            )}
            {dailyDate?.getMonth() + 1} &nbsp;
            {dailyDate?.getDate()} &nbsp;
            {weekDays[dailyDate?.getDay()]}
          </Text>
        </View>
      );
    default:
      return <Text>Default</Text>;
  }
}
