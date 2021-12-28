import React, { Component } from "react";
import { View, Text, TouchableOpacity, Touchable } from "react-native";

import PrevCalendarButton from "components/Buttons/PrevCalendarButton";
import NextCalendarButton from "components/Buttons/NextCalendarButton";
import DateCalendarText from "components/Texts/DateCalendarText";
import Calendar from "..";
import { useSelector, useDispatch } from "react-redux";
import { changeMonthlyCurrentDate } from "../../../rdx";

export default function Monthly(props) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const activeDate = new Date();
  const selectDate = useSelector((state) => {
    return state.dateReducer.monthlyDate;
  });

  const dispatch = useDispatch();

  const generateMatrix = () => {
    var matrix = [];
    //matrix[0] = this.weekDays;
    console.log("333333333", selectDate);
    var year = selectDate.getFullYear();
    var month = selectDate.getMonth();
    var firstDay = new Date(year, month, 1).getDay();
    var maxDays = nDays[month];
    if (month == 1) {
      // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }
    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      if (counter > maxDays) {
        break;
      }
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }
    return matrix;
  };
  const _onPress2 = (item) => {
    /*
    this.setState(() => {
      this.state.selectDate.setDate(item);
      this.goAddSchedule();
    });
    */
    dispatch(changeMonthlyCurrentDate(new Date(selectDate.setDate(item))));
    goAddSchedule();
  };

  const changeMonth = (n) => {
    /*
    this.setState(() => {
      this.state.selectDate.setMonth(this.state.selectDate.getMonth() + n);
      return this.state;
    });
    */
    const newDate = selectDate.setMonth(selectDate.getMonth() + n);
    dispatch(changeMonthlyCurrentDate(new Date(newDate)));
  };

  const goAddSchedule = () => {
    props.navigation.navigate("AddEvent2", {
      startdateValue: selectDate,
      enddateValue: selectDate,
    });
  };
  console.log("monthly render");
  var matrix = generateMatrix();
  var dayMatrix = weekDays;
  var days = [];
  days = dayMatrix.map((item, rowIndex) => {
    return (
      <View
        style={{
          flex: 0.5,
          flexDirection: "row",
          padding: 0,
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "silver",
        }}
      >
        <Text
          style={{
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

  var rows = [];
  let finalLineIndex = -1;
  rows = matrix.map((row, rowIndex) => {
    var rowItems = row.map((item, colIndex) => {
      console.log(item, nDays[selectDate.getMonth()]);
      if (item == nDays[selectDate.getMonth()]) {
        finalLineIndex = rowIndex;
        console.log("UUUUUU", rowIndex);
      }
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            borderWidth: 1,
            //borderRightWidth: 0,
            borderBottomWidth: 0,
            flexDirection: "row",
            borderRightWidth: colIndex == 6 ? 1 : 0,
            borderTopLeftRadius : colIndex == 0 && rowIndex == 1 ? 10 : 0
          }}
        >
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              // Highlight header
              backgroundColor: rowIndex == 0 ? "#ddd" : "#fff",

              // Highlight Sundays
              color:
                colIndex == 0
                  ? "#a00"
                  : item == activeDate.getDate() &&
                    activeDate.getMonth() == selectDate.getMonth()
                  ? "blue"
                  : "black",
              // Highlight current date

              /*
              color:
                item == activeDate.getDate() &&
                activeDate.getMonth() == selectDate.getMonth()
                  ? "blue"
                  : "black",
              */
              fontWeight:
                item == activeDate.getDate() &&
                activeDate.getMonth() == selectDate.getMonth()
                  ? "bold"
                  : "",
            }}
            onPress={() => {
              if (item != -1) {
                _onPress2(item);
              }
            }}
          >
            {item != -1 ? item : ""}
          </Text>
        </TouchableOpacity>
      );
    });
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          padding: 0,
          justifyContent: "space-around",
          borderBottomWidth: rowIndex == finalLineIndex ? 1 : 0,
         
        }}
      >
        {rowItems}
      </View>
    );
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.8, flexDirection: "row" }}>
        <PrevCalendarButton onPress={() => changeMonth(-1)} />
        <DateCalendarText isMWD="M" />
        <NextCalendarButton onPress={() => changeMonth(+1)} />
      </View>
      <View
        style={{
          flex: 0.5,
          flexDirection: "row",
          alignItmes: "center",
          justifyContent: "center",

          //marginLeft: (width / 7.6) * 0.6,
        }}
      >
        {days}
      </View>
      <View style={{ flex: 11  }}>{rows}</View>
    </View>
  );

  //render 끝나는 부분
}
//export default Monthly;
