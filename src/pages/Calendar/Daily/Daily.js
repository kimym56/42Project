import React, { Component, useEffect } from "react";
import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import Test from "components/TimeSlot/TimeSlotSelector.js";
import TestDay from "components/TimeSlot/TimeSlotCell.js";

import PrevCalendarButton from "components/Buttons/PrevCalendarButton";
import NextCalendarButton from "components/Buttons/NextCalendarButton";
import DateCalendarText from "components/Texts/DateCalendarText";
import { useSelector, useDispatch } from "react-redux";
import { changeDailyCurrentDate } from "../../../rdx";
export default function Daily(props) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let days = [];
  const dispatch = useDispatch();
  const currentDate = useSelector((state) => {return state.dateReducer.dailyDate});
  console.log('after useS : ',currentDate)
 
  for (let i = 0; i < 96; i++) {
    days.push({
      id: Math.floor(48 * (i % 2) + (i / 2 + 1)),
      number: Math.floor(48 * (i % 2) + (i / 2 + 1)),
      active: false,
    });
  }

  const onSingleCellSelection = (dayIndex) => {
    days[dayIndex].active = true;
  };

  const onMultiSelectionEnd = (selectionMode, selection) => {
    for (const index in selection) {
      days[selection[index]].active = selectionMode === "select";
    }
  };

  const renderCell = (day, cday) => (
    <TestDay cellsPerRow={2} currentDate={cday} {...day} />
  );

  const changeDate = (n) => {
    console.log('currentDate in changeDate : ', currentDate)
    dispatch(changeDailyCurrentDate(new Date(currentDate.setDate(currentDate.getDate()+n))))};
    //그냥 new Date(currentDate.getDate()+n)은 왜 안됨? 1226
  console.log("daily render");
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.8,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <PrevCalendarButton onPress={() => changeDate(-1)} />
        <DateCalendarText isMWD="D" />
        <NextCalendarButton onPress={() => changeDate(+1)} />
      </View>
      <View style={{ flex: 11 }}>
        <Test
          currentDate={currentDate}
          startselectValue={currentDate}
          endselectValue={currentDate}
          navigation={props.navigation}
          cellsPerRow={2}
          days={days}
          renderCell={renderCell}
          onSingleCellSelection={onSingleCellSelection}
          onMultiSelectionEnd={onMultiSelectionEnd}
        />
      </View>
    </View>
  );
}
