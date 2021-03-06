import React, { Component, useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";

import Test from "components/TimeSlot/TimeSlotSelector.js";
import TestDay from "components/TimeSlot/TimeSlotCell.js";
import PrevCalendarButton from "components/Buttons/PrevCalendarButton";
import NextCalendarButton from "components/Buttons/NextCalendarButton";
import DateCalendarText from "components/Texts/DateCalendarText";

import { useSelector, useDispatch } from "react-redux";
import { changeWeeklyCurrentDate } from "../../../rdx";

export default function Weekly(props) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  /*
 state = {
    days: [],
    currentDate: new Date(),
    todayDate: new Date(),
    tempDate: new Date(),
  };
  */
  const dispatch = useDispatch();
  let days = [];
  const currentDate = useSelector((state) => {
    return state.dateReducer.weeklyDate;
  });
  //const [currentDate, setCurrentDate] = useState(new Date());

  //let currentDate = new Date();
  let todayDate = new Date();
  for (let i = 0; i < 384; i++) {
    days.push({
      id: Math.floor(48 * (i % 8) + (i / 8 + 1)),
      number: Math.floor(48 * (i % 8) + (i / 8 + 1)),
      active: false,
    });
  }
  /*
  componentWillMount() {
    for (let i = 0; i < 384; i++) {
      this.state.days.push({
        id: Math.floor(48 * (i % 8) + (i / 8 + 1)),
        number: Math.floor(48 * (i % 8) + (i / 8 + 1)),
        active: false,
      });
    }
  }
  */
  useEffect(() => {
    const interval = setInterval(() => getDate(), 60000);
    return () => {
      console.log('return uE')
      clearInterval(interval);
    };
  });
  const getDate = () => {
    /*
    setState((state) => {
      state.currentDate.setMinutes(new Date().getMinutes());
      return { currentDate: state.currentDate };
    });
    */
    //setCurrentDate(new Date(currentDate.setMinutes(new Date().getMinutes())));

    currentDate.setMinutes(new Date().getMinutes());
    
    console.log('date after setMinute : ',currentDate)
    dispatch(changeWeeklyCurrentDate(new Date(currentDate)));
    return { currentDate };
  };
  /*
  componentDidMount() {
    this.oneMinuteCall = setInterval(() => this.getDate(), 60000);
  }
  componentWillUnmount() {
    clearInterval(this.oneMinuteCall);
  }
  */

  const onSingleCellSelection = (dayIndex) => {
    //const days = days;
    days[dayIndex].active = true;
  };

  const onMultiSelectionEnd = (selectionMode, selection) => {
    //const days = days;
    for (const index in selection) {
      days[selection[index]].active = selectionMode === "select";
    }
  };

  const renderCell = (day, cday) => (
    <TestDay currentDate={cday} cellsPerRow={8} {...day} />
  );
  const changeDate = (n) => {
    /*
    this.setState(() => {
      this.state.currentDate.setDate(this.state.currentDate.getDate() + n);

      return this.state;
    });
    */
    const date = currentDate.setDate(currentDate.getDate() + n);
    dispatch(changeWeeklyCurrentDate(new Date(currentDate)));
    //setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + n)));

    console.log("cur!", currentDate);
    return currentDate;
  };

  const generateMatrix = (isDate) => {
    var matrix = [];
    if (!isDate) {
      matrix = weekDays;
    } else {
      console.log("Ssssss", currentDate);
      let todayDay = currentDate.getDay();
      matrix[todayDay] = currentDate.getDate();

      for (let i = todayDay - 1; i >= 0; i--) {
        let tempDate = new Date();
        tempDate.setMonth(currentDate.getMonth());
        tempDate.setDate(currentDate.getDate() - (todayDay - i));
        matrix[i] = tempDate.getDate();
        console.log("tempDate : ", tempDate);
      }
      for (let i = todayDay + 1; i <= 6; i++) {
        let tempDate = new Date();
        tempDate.setMonth(currentDate.getMonth());
        tempDate.setDate(currentDate.getDate() + (i - todayDay));
        matrix[i] = tempDate.getDate();
      }
    }
    return matrix;
  };
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;

  console.log("weekly render");

  var date = generateMatrix(1);
  var dates = [];
  dates = date.map((item, rowIndex) => {
    return (
      <View
        style={{
          flex: 0.5,
          flexDirection: "row",
          padding: 5,
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            fontFamily: "Pridi-Light",
            fontSize: 15,
            flex: 1,
            height: 20,
            textAlign: "center",
            // Highlight current date
            fontWeight:
              item == todayDate.getDate()
                ? todayDate.getMonth() == currentDate.getMonth()
                  ? "bold"
                  : ""
                : "",
          }}
        >
          {item}
        </Text>
      </View>
    );
  });

  var matrix = generateMatrix(0);
  var rows = [];
  rows = matrix.map((item, rowIndex) => {
    return (
      <View
        style={{
          flex: 0.5,
          flexDirection: "row",
          padding: 5,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Pridi-Light",
            fontSize: 15,
            flex: 1,
            height: 20,
            textAlign: "center",
            color: rowIndex == 0 ? "#f00" : rowIndex == 6 ? "#00f" : "",
          }}
        >
          {item}
        </Text>
      </View>
    );
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#F2F3F5" }}>
      <View
        style={{
          flex: 0.8,
          flexDirection: "row",
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderColor: "rgba(0,0,0,0.1)",
        }}
      >
        <PrevCalendarButton onPress={() => changeDate(-7)} />
        <DateCalendarText isMWD="W" />
        <NextCalendarButton onPress={() => changeDate(+7)} />
      </View>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            alignItmes: "center",
            justifyContent: "center",
            backgroundColor: "white",
            marginLeft: (width / 7.6) * 0.6,
          }}
        >
          {rows}
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            alignItmes: "center",
            justifyContent: "center",
            marginLeft: (width / 7.6) * 0.6,
            borderBottomWidth: 1,
            borderColor: "rgba(0,0,0,0.1)",
          }}
        >
          {dates}
        </View>
      </View>
      <View style={{ flex: 10 }}>
        <Test
          currentDate={currentDate}
          navigation={props.navigation}
          days={days}
          renderCell={renderCell}
          cellsPerRow={8}
          onSingleCellSelection={onSingleCellSelection}
          onMultiSelectionEnd={onMultiSelectionEnd}
        />
      </View>
    </View>
  );
}
