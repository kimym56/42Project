import React, { useEffect } from "react";
import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import Test from "components/TimeSlot/TimeSlotSelector.js";
import TestDay from "components/TimeSlot/TimeSlotCell.js";

import PrevCalendarButton from "components/Buttons/PrevCalendarButton";
import NextCalendarButton from "components/Buttons/NextCalendarButton";
import DateCalendarText from "components/Texts/DateCalendarText";

import { changeCurrentdate} from "../../../rdx/index";

import { useSelector, useDispatch } from "react-redux";
export default function Daily(props) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var days = [];
  for (let i = 0; i < 96; i++) {
    days.push({
      id: Math.floor(48 * (i % 2) + (i / 2 + 1)),
      number: Math.floor(48 * (i % 2) + (i / 2 + 1)),
      active: false,
    });
  }
  const currentDate = useSelector((state) => state.dateReducer.currentDate);
  const dispatch = useDispatch();

  

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
    const date = new Date(
      currentDate.setDate(currentDate.getDate() + n)
    );
    dispatch(changeCurrentdate(date));
    return currentDate;
  };

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
        <DateCalendarText isMWD="D" currentDate={currentDate} />
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
